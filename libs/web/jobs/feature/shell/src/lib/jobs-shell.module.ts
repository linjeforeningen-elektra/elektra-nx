import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JOBS_SHELL_ROUTES } from './jobs-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(JOBS_SHELL_ROUTES)],
})
export class JobsShellModule {}
