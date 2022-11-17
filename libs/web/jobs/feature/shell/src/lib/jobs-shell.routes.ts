import { Routes } from '@angular/router';

export const JOBS_SHELL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: async () => await (await import('@elektra-nx/web/jobs/feature/list')).JobsListModule,
  },
];
