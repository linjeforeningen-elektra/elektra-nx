import { Routes } from '@angular/router';
import { JobResolver } from '@elektra-nx/web/jobs/data-access';

export const JOBS_SHELL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('@elektra-nx/web/jobs/feature/list')).JobsListModule,
  },
  {
    path: ':id',
    loadChildren: async () => (await import('@elektra-nx/web/jobs/feature/detail')).JobsDetailModule,
    resolve: { job: JobResolver },
  },
];
