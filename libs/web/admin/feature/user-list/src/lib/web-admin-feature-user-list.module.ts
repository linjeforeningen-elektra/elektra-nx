import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAdminFeatureUserListComponent } from './web-admin-feature-user-list.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { WebAdminUiUserListItemModule } from '@elektra-nx/web/admin/ui/user-list-item';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebAdminFeatureUserListComponent }]),
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    WebAdminUiUserListItemModule,
    ScrollingModule,
    ReactiveFormsModule,
  ],
  declarations: [WebAdminFeatureUserListComponent],
})
export class WebAdminFeatureUserListModule {}
