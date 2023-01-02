import { API_MAIL_QUEUE_TOKEN } from '@elektra-nx/api/mail/utils';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { first, lastValueFrom, tap, timer } from 'rxjs';
import { MailJob, MailJobType } from '../../interfaces';

@Processor(API_MAIL_QUEUE_TOKEN)
export class ApiMailConsumer {
  constructor() {}

  @Process()
  async processMail(job: Job<MailJob>) {
    const body = job.data;

    switch (body.type) {
      case MailJobType.EMAIL_CONFIRMATION:
        {
          console.log('EMAIL CONFIRMATION');
        }
        break;
      case MailJobType.PASSWORD_RESET:
        {
          console.log('PASSWORD RESET');
        }
        break;
      default:
        break;
    }

    await lastValueFrom(
      timer(5000).pipe(
        tap(() => console.log(job.data)),
        first(),
      ),
    );
  }
}
