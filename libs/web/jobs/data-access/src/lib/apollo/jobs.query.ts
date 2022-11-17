import { JobModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface FindJobsQueryResult {
  readonly jobs: JobModel[];
}

export const FindJobsQuery = gql<FindJobsQueryResult, unknown>`
  query FindJobs {
    jobs: jobs {
      id
      title
      location
      deadline
      company
      companyimg
      pct
    }
  }
`;
