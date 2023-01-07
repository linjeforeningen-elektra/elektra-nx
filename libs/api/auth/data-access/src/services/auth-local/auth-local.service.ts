import {
  ForbiddenException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  LoginWithAuthLocalDto,
  CreateAuthLocalDto,
  CreateUserDto,
  RegisterWithAuthLocalDto,
} from '@elektra-nx/api/shared/dto';
import * as bcrypt from 'bcryptjs';
import { AuthLocal } from '../../entities/auth-local.entity';
import { User } from '@elektra-nx/api/user/models';
import { AuthConfigService } from '@elektra-nx/api/auth/config';
import { EmailConfirmation, PasswordReset } from '../../entities';
import * as moment from 'moment';
import { ElektraErrors } from '@elektra-nx/shared/util/types';
import { ApiMailProducer, MailJobType } from '@elektra-nx/api/mail/data-access';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthLocalService {
  constructor(
    @InjectRepository(AuthLocal) private authLocal: Repository<AuthLocal>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(EmailConfirmation) private emailConfirmation: Repository<EmailConfirmation>,
    @InjectRepository(PasswordReset) private passwordReset: Repository<PasswordReset>,
    private em: EntityManager,
    private conf: AuthConfigService,
    private mail: ApiMailProducer,
    private jwt: JwtService,
  ) {}

  public async resetPasswordByHash(hash: string, password: string): Promise<string> {
    const passwordReset = await this.passwordReset.findOneBy({ hash });

    if (!passwordReset) {
      throw new NotFoundException(`Password reset not found`);
    }

    if (moment().utc(false) > moment(passwordReset.expires).utc(false)) {
      throw new GoneException(`Password reset expired.`);
    }

    const authLocal = await this.authLocal.findOneBy({ id: passwordReset.authLocalId });

    if (!authLocal) {
      throw new NotFoundException(`Auth local not found`);
    }

    const _salt = await bcrypt.genSalt(this.conf.BCRYPT_ROUNDS);
    const _hash = await bcrypt.hash(password, _salt);

    await this.em.transaction(async (em) => {
      await em.save(AuthLocal, { ...authLocal, salt: _salt, hash: _hash });
      await em.remove(PasswordReset, passwordReset);
    });

    return authLocal.email;
  }

  public async createPasswordReset(email: string): Promise<string> {
    // check if auth local exists
    const authLocal = await this.authLocal.findOneBy({ email });

    if (!authLocal) {
      throw new NotFoundException(`Email not found.`);
    }

    // check if password reset exists
    const passwordReset: PasswordReset = await this.passwordReset.findOneBy({ authLocalId: authLocal.id });

    if (passwordReset) {
      await this.passwordReset.remove(passwordReset);
    }

    const hash = crypto.randomBytes(20).toString('hex');
    const expires = moment().utc(false).add(15, 'm');

    await this.em.transaction(async (em) => {
      await this.mail.addJobb({ type: MailJobType.PASSWORD_RESET, data: { hash, email } });
      await em.save(PasswordReset, { hash, expires, authLocal });
    });

    return email;
  }

  // add timing attack guard
  public async loginWithAuthLocal(dto: LoginWithAuthLocalDto): Promise<{ user: User; email: string }> {
    const { email, password } = dto;

    const found = await this.authLocal.findOneBy({ email });
    if (!found) {
      throw new ForbiddenException('Email/Password combination wrong.');
    }

    const hash = await bcrypt.hash(password, found.salt);
    if (hash !== found.hash) {
      throw new ForbiddenException('Email/Password combination wrong.');
    }

    if (!found.confirmed) {
      await this.createOrReplaceEmailConfirmation(email);
      throw new ForbiddenException(ElektraErrors.EMAIL_NOT_CONFIRMED);
    }

    const user = await this.user.findOneBy({ id: found.userId });
    if (!user) throw new InternalServerErrorException('AuthLocal has no user.');

    return { user, email };
  }

  private async createUserId(): Promise<{ id: string }> {
    const [{ id }] = await this.em.query('SELECT uuid_generate_v4() as id');
    return { id };
  }

  private async createAuthLocalObject(dto: CreateAuthLocalDto): Promise<AuthLocal> {
    const { email, password } = dto;
    const auth = new AuthLocal();

    const salt = await bcrypt.genSalt(this.conf.BCRYPT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    auth.email = email;
    auth.salt = salt;
    auth.hash = hash;

    return auth;
  }

  private async createUserObject(dto: CreateUserDto): Promise<User> {
    const { name, slug } = dto;
    const { id } = await this.createUserId();

    const user = new User();
    user.name = name;
    user.slug = slug;
    user.id = id;
    user.ownerId = id;

    return user;
  }

  public async registerWithEmailPassword(dto: RegisterWithAuthLocalDto): Promise<string> {
    const exists = await this.authLocal.findOneBy({ email: dto.auth.email });

    if (exists) {
      throw new ForbiddenException(`Account with email exists.`);
    }

    const email = await this.em.transaction(async (em: EntityManager) => {
      let user = await this.createUserObject(dto.user);
      let auth = await this.createAuthLocalObject(dto.auth);
      auth.userId = user.id;
      auth.ownerId = user.id;

      user = await em.save(user);
      auth = await em.save(auth);

      return auth.email;
    });

    await this.createOrReplaceEmailConfirmation(email);

    return email;
  }

  private generateNumberString(length = 6): string {
    return Array(length)
      .fill(0)
      .map(() => Math.round(9 * Math.random()))
      .join('');
  }

  public async confirmEmail(email: string, code: string): Promise<{ user: User; email: string }> {
    const authLocal = await this.authLocal.findOneBy({ email });

    if (!authLocal) {
      throw new NotFoundException(`No confirmation found.`);
    }

    const emailConfirmation = await this.emailConfirmation.findOneBy({
      authLocalId: authLocal.id,
      code,
    });

    if (!emailConfirmation) {
      throw new NotFoundException(`No confirmation found.`);
    }

    if (moment().utc(false) > moment(emailConfirmation.expiration).utc(false)) {
      await this.emailConfirmation.remove(emailConfirmation);
      throw new GoneException(`Email confirmation has expired.`);
    }

    await this.em.transaction(async (em) => {
      await em.save(AuthLocal, { ...authLocal, confirmed: true });
      await em.remove(emailConfirmation);
    });

    const user = await this.user.findOneBy({ id: authLocal.userId });
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    return { user, email };
  }

  public createDateFromExpiration() {
    const expiration = this.conf.EMAIL_CONFIRMATION_EXPIRATION;
    const regex = /^(\d+)(h|m|s)$/;
    const [_, digits, modifier] = regex.exec(expiration);

    return moment().add(digits, <'h' | 'm' | 's'>modifier);
  }

  public async createOrReplaceEmailConfirmation(email: string): Promise<string> {
    const authLocal = await this.authLocal.findOneBy({ email });

    if (!authLocal) {
      throw new NotFoundException(`Email not found.`);
    }

    if (authLocal.confirmed) {
      throw new ForbiddenException('Email already confirmed.');
    }

    // check if one exists and delete if found
    const exists = await this.emailConfirmation.findOneBy({ authLocalId: authLocal.id });

    if (exists) {
      await this.emailConfirmation.remove(exists);
    }

    const code = this.generateNumberString();
    const expiration = this.createDateFromExpiration().utc(false);

    const hash = this.jwt.sign({ code, email });

    await this.emailConfirmation.save({ authLocal, code, expiration });
    await this.mail.addJobb({
      type: MailJobType.EMAIL_CONFIRMATION,
      data: {
        email,
        code,
        hash,
      },
    });

    return email;
  }
}
