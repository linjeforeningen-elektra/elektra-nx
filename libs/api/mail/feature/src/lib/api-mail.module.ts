import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { API_MAIL_QUEUE_TOKEN } from '@elektra-nx/api/mail/utils';
import { ApiMailConsumer, ApiMailProducer } from '@elektra-nx/api/mail/data-access';
import { MailerModule } from '@nestjs-modules/mailer';
import { ApiMailConfigModule, ApiMailConfigService } from '@elektra-nx/api/mail/config';
import { ApiShellConfigModule, ApiShellConfigService } from '@elektra-nx/api/shell/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

const substr = (v: string) => v.substring(0, 48);

@Module({
  imports: [
    BullModule.registerQueue({
      name: API_MAIL_QUEUE_TOKEN,
    }),
    MailerModule.forRootAsync({
      imports: [ApiMailConfigModule, ApiShellConfigModule],
      inject: [ApiMailConfigService, ApiShellConfigService],
      useFactory: (conf: ApiMailConfigService, shell: ApiShellConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: 'OAuth2',
            user: conf.USER, //your permissioned service account member e-mail address
            serviceClient: conf.CLIENT_ID,
            privateKey: conf.PRIVATE_KEY,
          },
          connectionTimeout: 10e3,
        },
        defaults: {
          from: {
            name: conf.FROM,
            address: conf.USER,
          },
        },
        preview: conf.PREVIEW
          ? {
              dir: join(process.cwd(), 'dist'),
              open: true,
            }
          : false,
        template: {
          adapter: new HandlebarsAdapter({ substr }),
          dir: shell.ENV != 'production' ? 'libs/api/mail/data-access/src/lib/templates' : 'templates',
        },
      }),
    }),
  ],
  providers: [ApiMailConsumer, ApiMailProducer],
  exports: [ApiMailProducer, MailerModule],
})
export class ApiMailModule {}
