import { Routes } from '@angular/router';

export const ADMIN_SHELL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('@elektra-nx/web/admin/feature/dashboard')).AdminDashboardModule,
  },
];
