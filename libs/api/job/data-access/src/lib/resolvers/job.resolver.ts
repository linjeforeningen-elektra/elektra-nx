import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { JobSchema } from '@elektra-nx/api/job/utils';
import { JobService } from '../services';

@Resolver(JobSchema)
export class JobResolver {
  constructor(private job: JobService) {}

  @Query(() => [JobSchema], { name: 'jobs' })
  public findJobs() {
    return this.job.getAllJobs();
  }

  @Query(() => JobSchema, { name: 'job' })
  public findJob(@Args('jobId', { type: () => Int }) jobId: number) {
    return this.job.getJobById(jobId);
  }
}
