import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiShellConfigService {
  constructor(private conf: ConfigService) {}

  get ENV() {
    return this.conf.get('shell.ENV');
  }
}
