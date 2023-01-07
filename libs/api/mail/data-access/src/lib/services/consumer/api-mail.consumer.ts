import { API_MAIL_QUEUE_TOKEN } from '@elektra-nx/api/mail/utils';
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Job } from 'bull';
import { first, from, lastValueFrom, Observable, switchMap, timer } from 'rxjs';
import { MailJob, MailJobType } from '../../interfaces';
import { ApiShellConfigService } from '@elektra-nx/api/shell/config';

@Processor(API_MAIL_QUEUE_TOKEN)
export class ApiMailConsumer implements OnModuleInit {
  constructor(private mail: MailerService, private shellConf: ApiShellConfigService) {}

  private readonly logger = new Logger(ApiMailConsumer.name);

  @Process()
  async processMail(job: Job<MailJob>) {
    this.logger.log(`Processing job: ${job.data.type}`);

    const body = job.data;

    let job$: () => Observable<unknown>;

    switch (body.type) {
      case MailJobType.EMAIL_CONFIRMATION:
        {
          job$ = () => this.sendEmailConfirmation(body.data.email, body.data.code, body.data.hash);
        }
        break;
      case MailJobType.PASSWORD_RESET:
        {
          job$ = () => this.sendPasswordReset(body.data.email, body.data.hash);
        }
        break;
      default:
        break;
    }

    return lastValueFrom(timer(5000).pipe(switchMap(() => job$().pipe(first()))));
  }

  private sendPasswordReset(to: string, hash: string) {
    const link = this.shellConf.HOST + '/auth/tilbakestill-passord/' + hash;

    return from(
      this.mail.sendMail({
        to,
        subject: 'Tilbakestilling av passord',
        template: 'reset-password',
        context: {
          link,
        },
      }),
    );
  }

  private sendEmailConfirmation(to: string, code: string, hash: string) {
    const link = this.shellConf.HOST + '/auth/bekreft-epost/' + hash;

    return from(
      this.mail.sendMail({
        to,
        subject: 'Bekreftelse av e-post',
        template: 'confirm-email',
        context: {
          code,
          link,
        },
      }),
    );
  }

  async onModuleInit() {
    return;
  }
}
