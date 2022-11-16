import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private conf: ConfigService) {}

  get HOST(): string {
    return this.conf.get('database.HOST');
  }

  get PORT(): number {
    return this.conf.get('database.PORT');
  }

  get USERNAME(): string {
    return this.conf.get('database.USERNAME');
  }

  get PASSWORD(): string {
    return this.conf.get('database.PASSWORD');
  }

  get DATABASE(): string {
    return this.conf.get('database.DATABASE');
  }

  get SYNC(): boolean {
    return this.conf.get('database.SYNC');
  }
}
