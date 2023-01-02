import { API_MAIL_QUEUE_TOKEN } from '@elektra-nx/api/mail/utils';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MailJob } from '../../interfaces';

@Injectable()
export class ApiMailProducer {
  constructor(@InjectQueue(API_MAIL_QUEUE_TOKEN) private queue: Queue) {}

  public async addJobb(body: MailJob) {
    return this.queue.add(body);
  }
}
