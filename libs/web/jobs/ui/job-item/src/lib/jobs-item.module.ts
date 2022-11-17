import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from './job-item.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [JobItemComponent],
  exports: [JobItemComponent],
})
export class JobsItemModule {}
