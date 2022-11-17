import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JobConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JOB_FETCH_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, JobConfigService],
  exports: [ConfigService, JobConfigService],
})
export class JobConfigModule {}
