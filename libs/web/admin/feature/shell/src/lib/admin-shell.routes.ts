import { Routes } from '@angular/router';
import { WebUserDetailResolver } from '@elektra-nx/web/admin/data-access';

export const ADMIN_SHELL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('@elektra-nx/web/admin/feature/dashboard')).AdminDashboardModule,
  },
  {
    path: 'brukere',
    loadChildren: async () => (await import('@elektra-nx/web/admin/feature/user-list')).WebAdminFeatureUserListModule,
  },
  {
    path: 'brukere/:userId',
    loadChildren: async () =>
      (await import('@elektra-nx/web/admin/feature/user-detail')).WebAdminFeatureUserDetailModule,
    resolve: { user: WebUserDetailResolver },
  },
];
