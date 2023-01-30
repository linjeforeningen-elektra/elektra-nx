import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAdminFeatureUserListComponent } from './web-admin-feature-user-list.component';
import { RouterModule } from '@angular/router';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
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
