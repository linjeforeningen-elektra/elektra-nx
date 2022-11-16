import { AuthUser } from '@elektra-nx/api/auth/utils';
import { MembershipService } from '@elektra-nx/api/membership/data-access';
import { LoginWithAuthLocalDto, RegisterWithAuthLocalDto } from '@elektra-nx/api/shared/dto';
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
    const { user, email } = await this.authLocal.registerWithEmailPassword(dto);
    return this.auth.login(user.id, email, []);
  }
}
