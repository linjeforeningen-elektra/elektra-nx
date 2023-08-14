import { Route } from '@angular/router';
import { LayoutShellComponent } from '@elektra-nx/web/layout/feature/shell';
import { WebRoutes } from '@elektra-nx/web/shell/utils';

export const WEB_SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutShellComponent,
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
      {
        path: 'admin',
        loadChildren: async () => (await import('@elektra-nx/web/admin/feature/shell')).AdminShellModule,
      },
      {
        path: WebRoutes.CONTACT,
        loadChildren: async () => (await import('@elektra-nx/web/contact/feature')).ContactModule,
      },
      {
        path: WebRoutes.NEW_STUDENT,
        loadChildren: async () => (await import('@elektra-nx/web/new-student/feature')).WebNewStudentFeatureModule,
      },
      {
        path: WebRoutes.JOBS,
        loadChildren: async () => (await import('@elektra-nx/web/jobs/feature/shell')).JobsShellModule,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: WebRoutes.HOME,
      },
      {
        path: '**',
        loadChildren: async () => (await import('@elektra-nx/web/not-found/feature')).NotFoundModule,
      },
    ],
  },
];
