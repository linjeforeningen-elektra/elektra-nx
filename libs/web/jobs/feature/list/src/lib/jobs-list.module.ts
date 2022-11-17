import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsListComponent } from './jobs-list.component';
import { RouterModule } from '@angular/router';
import { JobsItemModule } from '@elektra-nx/web/jobs/ui/job-item';

@NgModule({
  imports: [CommonModule, JobsItemModule, RouterModule.forChild([{ path: '', component: JobsListComponent }])],
  declarations: [JobsListComponent],
})
export class JobsListModule {}
