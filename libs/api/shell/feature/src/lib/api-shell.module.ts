import { ApiApolloModule } from '@elektra-nx/api/apollo/feature';
import { BlockModule } from '@elektra-nx/api/block/feature';
import { ApiJobModule } from '@elektra-nx/api/job/feature';
import { ApiQueueModule } from '@elektra-nx/api/queue/feature';
import { ApiShellConfigModule } from '@elektra-nx/api/shell/config';
import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiMailModule } from '@elektra-nx/api/mail/feature';

@Global()
@Module({
  imports: [
    ApiShellConfigModule,
    ScheduleModule.forRoot(),
    ApiApolloModule,
    BlockModule,
    ApiJobModule,
    ApiQueueModule,
    ApiMailModule,
  ],
  exports: [ApiShellConfigModule, ApiMailModule],
})
export class ApiShellModule {}
