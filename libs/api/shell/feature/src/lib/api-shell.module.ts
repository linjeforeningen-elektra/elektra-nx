import { ApiApolloModule } from '@elektra-nx/api/apollo/feature';
import { BlockModule } from '@elektra-nx/api/block/feature';
import { ApiJobModule } from '@elektra-nx/api/job/feature';
import { ApiShellConfigModule } from '@elektra-nx/api/shell/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ApiShellConfigModule, ScheduleModule.forRoot(), ApiApolloModule, BlockModule, ApiJobModule],
  exports: [ApiShellConfigModule],
})
export class ApiShellModule {}
