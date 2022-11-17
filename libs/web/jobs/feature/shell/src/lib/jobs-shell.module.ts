import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JOBS_SHELL_ROUTES } from './jobs-shell.routes';
import { JobResolver } from '@elektra-nx/web/jobs/data-access';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(JOBS_SHELL_ROUTES)],
  providers: [JobResolver],
})
export class JobsShellModule {}
