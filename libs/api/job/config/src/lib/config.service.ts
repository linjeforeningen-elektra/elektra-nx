import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobConfigService {
  constructor(private conf: ConfigService) {}

  get FETCH_URL(): string {
    return this.conf.get('job.FETCH_URL');
  }
}
