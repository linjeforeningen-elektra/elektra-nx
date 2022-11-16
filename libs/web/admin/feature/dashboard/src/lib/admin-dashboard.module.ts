import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { WebBlockModule } from '@elektra-nx/web/block/feature';

@NgModule({
  imports: [CommonModule, WebBlockModule, RouterModule.forChild([{ path: '', component: AdminDashboardComponent }])],
  declarations: [AdminDashboardComponent],
})
export class AdminDashboardModule {}
