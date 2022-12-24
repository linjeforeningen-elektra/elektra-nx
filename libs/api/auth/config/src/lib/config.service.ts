import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private conf: ConfigService) {}

  get JWT_EXPIRY(): string {
    return this.conf.get('auth.JWT_EXPIRY');
  }

  get JWT_SECRET(): string {
    return this.conf.get('auth.JWT_SECRET');
  }

  get BCRYPT_ROUNDS(): number {
    return this.conf.get('auth.BCRYPT_ROUNDS');
  }

  get EMAIL_CONFIRMATION_EXPIRATION(): string {
    return this.conf.get('auth.EMAIL_CONFIRMATION_EXPIRATION');
  }
}
