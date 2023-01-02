import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { ApiMailConfigService } from './api-mail-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_USER: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().required(),
        MAIL_CLIENT_ID: Joi.string().required(),
        MAIL_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, ApiMailConfigService],
  exports: [ConfigService, ApiMailConfigService],
})
export class ApiMailConfigModule {}
