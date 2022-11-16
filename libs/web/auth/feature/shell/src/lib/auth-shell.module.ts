import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  template: '',
  styles: [],
})
class LogoutComponent {}

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      // {
      //   path: 'logout',
      //   canActivate: [LogoutGuard],
      //   component: LogoutComponent,
      // },
      {
        path: 'login',
        loadChildren: async () => (await import('@elektra-nx/web/auth/feature/signin')).SigninModule,
      },
      {
        path: 'register',
        loadChildren: async () => (await import('@elektra-nx/web/auth/feature/signup')).SignupModule,
      },
    ]),
  ],
  providers: [],
})
export class AuthShellModule {}
