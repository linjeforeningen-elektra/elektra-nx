import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMIN_SHELL_ROUTES } from './admin-shell.routes';
import { WebUserDetailResolver } from '@elektra-nx/web/admin/data-access';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ADMIN_SHELL_ROUTES)],
  providers: [WebUserDetailResolver],
})
export class AdminShellModule {}
