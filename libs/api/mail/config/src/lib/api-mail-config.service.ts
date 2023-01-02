import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiMailConfigService {
  constructor(private conf: ConfigService) {}

  get CLIENT_ID(): string {
    return this.conf.get('mail.CLIENT_ID');
  }

  get PRIVATE_KEY(): string {
    return this.conf.get('mail.PRIVATE_KEY');
  }

  get HOST(): string {
    return this.conf.get('mail.HOST');
  }

  get PORT(): number {
    return this.conf.get('mail.PORT');
  }

  get USER(): string {
    return this.conf.get('mail.USER');
  }

  get FROM(): string {
    return this.conf.get('mail.FROM');
  }

  get PREVIEW(): boolean {
    return this.conf.get('mail.PREVIEW');
  }
}
