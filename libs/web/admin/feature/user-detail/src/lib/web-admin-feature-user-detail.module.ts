import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAdminFeatureUserDetailComponent } from './web-admin-feature-user-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: WebAdminFeatureUserDetailComponent }])],
  declarations: [WebAdminFeatureUserDetailComponent],
})
export class WebAdminFeatureUserDetailModule {}
