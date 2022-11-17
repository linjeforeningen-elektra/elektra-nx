import { Route } from '@angular/router';
import { LayoutComponent } from '@elektra-nx/web/shell/ui/layout';
import { WebRoutes } from '@elektra-nx/web/shell/utils';

export const WEB_SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: WebRoutes.AUTH,
        loadChildren: async () => (await import('@elektra-nx/web/auth/feature/shell')).AuthShellModule,
      },
      {
        path: WebRoutes.HOME,
        loadChildren: async () => (await import('@elektra-nx/web/home/feature')).HomeModule,
      },
      {
        path: WebRoutes.ACCOUNT,
        loadChildren: async () => (await import('@elektra-nx/web/account/feature/shell')).AccountShellModule,
      },
      // {
      //   path: 'admin',
      //   loadChildren: async () => (await import('@elektra-nx/web/admin/feature/shell')).AdminShellModule,
      // },
      {
        path: WebRoutes.CONTACT,
        loadChildren: async () => (await import('@elektra-nx/web/contact/feature')).ContactModule,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: '**',
        loadChildren: async () => (await import('@elektra-nx/web/not-found/feature')).NotFoundModule,
      },
    ],
  },
];
