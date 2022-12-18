import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  LoginWithAuthLocalDto,
  CreateAuthLocalDto,
  CreateUserDto,
  RegisterWithAuthLocalDto,
} from '@elektra-nx/api/shared/dto';
import * as bcrypt from 'bcryptjs';
import { AuthLocalEntity } from '../../entities/auth-local.entity';
import { User } from '@elektra-nx/api/user/models';
import { AuthConfigService } from '@elektra-nx/api/auth/config';

@Injectable()
export class AuthLocalService {
  constructor(
    @InjectRepository(AuthLocalEntity) private authLocal: Repository<AuthLocalEntity>,
    @InjectRepository(User) private user: Repository<User>,
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

  private async createAuthLocalObject(dto: CreateAuthLocalDto): Promise<AuthLocalEntity> {
    const { email, password } = dto;
    const auth = new AuthLocalEntity();

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
}
