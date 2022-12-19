import { Routes } from '@angular/router';
import { IsLoggedInGuard } from '@elektra-nx/web/shared/data-access';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [IsLoggedInGuard],
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'dashboard',
      // },
      {
        path: '',
        loadChildren: async () => (await import('@elektra-nx/web/account/feature/dashboard')).DashboardModule,
      },
      {
        path: 'medlemskap',
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
