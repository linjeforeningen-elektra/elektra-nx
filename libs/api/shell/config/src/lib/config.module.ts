import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiShellConfigService } from './config.service';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        SHELL_ENV: Joi.string().default('development'),
      }),
    }),
  ],
  providers: [ConfigService, ApiShellConfigService],
  exports: [ConfigService, ApiShellConfigService],
})
export class ApiShellConfigModule {}
