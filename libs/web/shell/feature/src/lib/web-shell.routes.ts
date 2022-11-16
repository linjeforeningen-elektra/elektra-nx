import { Route } from '@angular/router';
import { LayoutComponent } from '@elektra-nx/web/shell/ui/layout';

export const WEB_SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: async () => (await import('@elektra-nx/web/auth/feature/shell')).AuthShellModule,
      },
      {
        path: 'home',
        loadChildren: async () => (await import('@elektra-nx/web/home/feature')).HomeModule,
      },
      {
        path: 'account',
        loadChildren: async () => (await import('@elektra-nx/web/account/feature/shell')).AccountShellModule,
      },
      {
        path: 'admin',
        loadChildren: async () => (await import('@elektra-nx/web/admin/feature/shell')).AdminShellModule,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];
