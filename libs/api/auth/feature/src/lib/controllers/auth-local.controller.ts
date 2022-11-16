import { AuthLocalAclAdapter } from '@elektra-nx/api/auth/data-access';
import { AuthUser, GetAuth } from '@elektra-nx/api/auth/utils';
import { LoginWithAuthLocalDto, RegisterWithAuthLocalDto } from '@elektra-nx/api/shared/dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth/local')
export class AuthLocalController {
  constructor(private auth: AuthLocalAclAdapter) {}

  @Post('login')
  public async loginWithAuthLocal(@GetAuth() auth: AuthUser, @Body() dto: LoginWithAuthLocalDto) {
    return this.auth.loginWithAuthLocal(auth, dto);
  }

  @Post('register')
  public async registerWithAuthLocal(@GetAuth() auth: AuthUser, @Body() dto: RegisterWithAuthLocalDto) {
    return this.auth.registerWithAuthLocal(auth, dto);
  }
}
