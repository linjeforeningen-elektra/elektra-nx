import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsDetailComponent } from './jobs-detail.component';
import { RouterModule } from '@angular/router';
import { JobsItemModule } from '@elektra-nx/web/jobs/ui/job-item';
import { MarkdownModule } from 'ngx-markdown';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    MatButtonModule,
    JobsItemModule,
    RouterModule.forChild([{ path: '', component: JobsDetailComponent }]),
  ],
  declarations: [JobsDetailComponent],
})
export class JobsDetailModule {}
