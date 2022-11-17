import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FindJobQuery, FindJobsQuery } from '../../apollo';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private apollo: Apollo) {}

  public getJobs() {
    return this.apollo.query({
      query: FindJobsQuery,
    });
  }

  public getJob(jobId: number) {
    return this.apollo.query({
      query: FindJobQuery,
      variables: { jobId },
    });
  }
}
