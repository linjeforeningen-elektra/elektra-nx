import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormConfigService {
  constructor(private conf: ConfigService) {}

  get HOST() {
    return this.conf.get('typeorm.HOST');
  }

  get PORT() {
    return this.conf.get('typeorm.PORT');
  }

  get USER() {
    return this.conf.get('typeorm.USER');
  }

  get PASSWORD() {
    return this.conf.get('typeorm.PASSWORD');
  }

  get DATABASE() {
    return this.conf.get('typeorm.DATABASE');
  }
}
