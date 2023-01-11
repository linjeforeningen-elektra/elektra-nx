import { AuthUser } from '@elektra-nx/api/auth/utils';
import { MembershipService } from '@elektra-nx/api/membership/data-access';
import { ConfirmEmailDto, LoginWithAuthLocalDto, RegisterWithAuthLocalDto } from '@elektra-nx/api/shared/dto';
import { User } from '@elektra-nx/api/user/models';
import { AccessResource, AccessRole } from '@elektra-nx/shared/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthLocalService, AuthService } from '../services';

@Injectable()
export class AuthLocalAclAdapter {
  constructor(private authLocal: AuthLocalService, private auth: AuthService, private membership: MembershipService) {}

  public async loginWithAuthLocal(auth: AuthUser, dto: LoginWithAuthLocalDto): Promise<{ access_token: string }> {
    const { user, email } = await this.authLocal.loginWithAuthLocal(dto);
    const roles = [AccessRole.USER].concat(user.roles);
    return this.auth.login(user.id, email, roles);
  }

  public async registerWithAuthLocal(auth: AuthUser, dto: RegisterWithAuthLocalDto) {
    return this.authLocal.registerWithEmailPassword(dto);
  }

  public async confirmEmail(auth: AuthUser, dto: ConfirmEmailDto) {
    const { code, email } = dto;
    const { user } = await this.authLocal.confirmEmail(email, code);
    const roles = [AccessRole.USER].concat(user.roles);

    return this.auth.login(user.id, email, roles);
  }

  public async createEmailConfirmation(auth: AuthUser, email: string) {
    return this.authLocal.createOrReplaceEmailConfirmation(email);
  }

  public async createPasswordReset(auth: AuthUser, email: string) {
    return this.authLocal.createPasswordReset(email);
  }

  public async resetPasswordByHash(auth: AuthUser, hash: string, password: string) {
    return this.authLocal.resetPasswordByHash(hash, password);
  }

  public async findAuthLocalFromUserRelation(auth: AuthUser, user: User) {
    const authLocal = await this.authLocal.findAuthLocalFromUserRelation(user.id);

    const permission = auth.read(authLocal, AccessResource.AUTH);
    if (!permission.granted) {
      throw new ForbiddenException();
    }

    return authLocal ? permission.filter(authLocal) : undefined;
  }
}
