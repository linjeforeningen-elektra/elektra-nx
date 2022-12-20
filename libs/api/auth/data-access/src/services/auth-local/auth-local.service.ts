import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
import { EmailConfirmation } from '../../entities';

@Injectable()
export class AuthLocalService {
  constructor(
    @InjectRepository(AuthLocal) private authLocal: Repository<AuthLocal>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(EmailConfirmation) private emailConfirmation: Repository<EmailConfirmation>,
    private em: EntityManager,
    private conf: AuthConfigService,
  ) {}

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

  public async registerWithEmailPassword(dto: RegisterWithAuthLocalDto): Promise<{ user: User; email: string }> {
    return this.em.transaction(async (em: EntityManager) => {
      let user = await this.createUserObject(dto.user);
      let auth = await this.createAuthLocalObject(dto.auth);
      auth.userId = user.id;
      auth.ownerId = user.id;

      user = await em.save(user);
      auth = await em.save(auth);

      return { user, email: auth.email };
    });
  }

  private generateNumberString(length = 6): string {
    return Array(length)
      .fill(0)
      .map(() => Math.round(9 * Math.random()))
      .join('');
  }

  public async createOrReplaceEmailConfirmation(email: string) {
    const authLocal = await this.authLocal.findOneBy({ email });

    if (!authLocal) {
      throw new NotFoundException(`Email not found.`);
    }

    // check if one exists and delete if found
    const exists = await this.emailConfirmation.findOneBy({ authLocalId: authLocal.id });

    if (exists) {
      await this.emailConfirmation.remove(exists);
    }

    return this.emailConfirmation.save({ authLocal });
  }
}
