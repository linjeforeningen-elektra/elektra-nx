import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiRedisConfigService {
  constructor(private conf: ConfigService) {}

  get PORT(): number {
    return this.conf.get('redis.PORT');
  }

  get HOST(): string {
    return this.conf.get('redis.HOST');
  }
}
