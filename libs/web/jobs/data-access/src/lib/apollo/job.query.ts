import { JobModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface FindJobQueryResult {
  readonly job: JobModel;
}

export interface FindJobQueryVariables {
  jobId: number;
}

export const FindJobQuery = gql<FindJobQueryResult, FindJobQueryVariables>`
  query FindJob($jobId: Int!) {
    job: job(jobId: $jobId) {
      id
      title
      location
      deadline
      company
      companyimg
      pct
      desc
      link
    }
  }
`;
