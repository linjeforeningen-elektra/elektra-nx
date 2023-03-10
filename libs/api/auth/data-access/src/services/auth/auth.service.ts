import { AccessRole } from '@elektra-nx/shared/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  public login(id: string, email: string, roles: AccessRole[]): { access_token: string } {
    const access_token = this.jwt.sign({ id, email, roles });
    return { access_token };
  }
}
