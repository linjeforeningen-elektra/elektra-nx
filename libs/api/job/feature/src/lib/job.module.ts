import { JobConfigModule } from '@elektra-nx/api/job/config';
import { JobResolver, JobService } from '@elektra-nx/api/job/data-access';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [JobConfigModule, HttpModule],
  providers: [JobService, JobResolver],
})
export class ApiJobModule {}
