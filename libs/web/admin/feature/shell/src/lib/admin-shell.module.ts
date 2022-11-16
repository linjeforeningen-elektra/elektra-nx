import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMIN_SHELL_ROUTES } from './admin-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ADMIN_SHELL_ROUTES)],
})
export class AdminShellModule {}
