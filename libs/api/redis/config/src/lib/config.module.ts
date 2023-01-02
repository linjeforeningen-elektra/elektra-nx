import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ApiRedisConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().default('redis'),
      }),
    }),
  ],
  providers: [ConfigService, ApiRedisConfigService],
  exports: [ConfigService, ApiRedisConfigService],
})
export class ApiRedisConfigModule {}
