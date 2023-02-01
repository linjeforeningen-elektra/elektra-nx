import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAdminFeatureUserListComponent } from './web-admin-feature-user-list.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { WebAdminUiUserListItemModule } from '@elektra-nx/web/admin/ui/user-list-item';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { WebSharedUiIsVisibleModule } from '@elektra-nx/web/shared/ui/is-visible';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebAdminFeatureUserListComponent }]),
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    WebAdminUiUserListItemModule,
    ScrollingModule,
    ReactiveFormsModule,
    WebSharedUiIsVisibleModule,
  ],
  declarations: [WebAdminFeatureUserListComponent],
})
export class WebAdminFeatureUserListModule {}
