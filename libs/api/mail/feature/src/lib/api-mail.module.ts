import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { API_MAIL_QUEUE_TOKEN } from '@elektra-nx/api/mail/utils';
import { ApiMailConsumer, ApiMailProducer } from '@elektra-nx/api/mail/data-access';

@Module({
  imports: [
    BullModule.registerQueue({
      name: API_MAIL_QUEUE_TOKEN,
    }),
  ],
  providers: [ApiMailConsumer, ApiMailProducer],
  exports: [ApiMailProducer],
})
export class ApiMailModule {}
