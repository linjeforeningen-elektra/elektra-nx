import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';
import { AuthConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        AUTH_JWT_EXPIRY: Joi.string().required(),
        AUTH_JWT_SECRET: Joi.string().required(),
        AUTH_BCRYPT_ROUNDS: Joi.number().required(),
        AUTH_EMAIL_CONFIRMATION_EXPIRATION: Joi.string()
          .pattern(/^(\d+)(h|m|s)$/)
          .default('2h'),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class ApiAuthConfigModule {}
