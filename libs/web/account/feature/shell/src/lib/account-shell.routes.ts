import { Routes } from '@angular/router';
import { IsLoggedInGuard } from '@elektra-nx/web/auth/utils';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: async () => (await import('@elektra-nx/web/account/feature/dashboard')).DashboardModule,
      },
      {
        path: 'membership',
        loadChildren: async () =>
          (await import('@elektra-nx/web/account/feature/membership-edit')).MembershipEditModule,
      },
    ],
  },
  // {
  //   path: '',
  //   loadChildren: async () => await (await import('@elektra-nx/web/account/feature/dashboard')).DashboardModule,
  // },
];
