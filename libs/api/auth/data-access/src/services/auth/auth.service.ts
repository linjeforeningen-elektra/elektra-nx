import { AccessRole } from '@elektra-nx/shared/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {
    console.log(
      this.jwt.sign({
        id: '1ac46b4c-d53a-4778-ae9b-ad32a163fb74',
        email: 'stian.bernhardsen@gmail.com',
      }),
    );
  }

  public login(id: string, email: string, roles: AccessRole[]): { access_token: string } {
    const access_token = this.jwt.sign({ id, email, roles: roles.concat([AccessRole.USER]) });
    return { access_token };
  }
}
