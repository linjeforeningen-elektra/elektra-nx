import { AuthUser } from '@elektra-nx/api/auth/utils';
import { MembershipService } from '@elektra-nx/api/membership/data-access';
import { ConfirmEmailDto, LoginWithAuthLocalDto, RegisterWithAuthLocalDto } from '@elektra-nx/api/shared/dto';
import { Injectable } from '@nestjs/common';
import { AuthLocalService, AuthService } from '../services';

@Injectable()
export class AuthLocalAclAdapter {
  constructor(private authLocal: AuthLocalService, private auth: AuthService, private membership: MembershipService) {}

  public async loginWithAuthLocal(auth: AuthUser, dto: LoginWithAuthLocalDto): Promise<{ access_token: string }> {
    const { user, email } = await this.authLocal.loginWithAuthLocal(dto);
    const MEMBERSHIP = await this.membership.isMember(user);
    const roles = user.roles.concat(MEMBERSHIP || []);

    return this.auth.login(user.id, email, roles);
  }

  public async registerWithAuthLocal(auth: AuthUser, dto: RegisterWithAuthLocalDto) {
    return this.authLocal.registerWithEmailPassword(dto);
  }

  public async confirmEmail(auth: AuthUser, dto: ConfirmEmailDto) {
    const { code, email } = dto;
    const { user } = await this.authLocal.confirmEmail(email, code);
    const MEMBERSHIP = await this.membership.isMember(user);
    const roles = user.roles.concat(MEMBERSHIP || []);

    return this.auth.login(user.id, email, roles);
  }

  public async createEmailConfirmation(auth: AuthUser, email: string) {
    return this.authLocal.createOrReplaceEmailConfirmation(email);
  }
}
