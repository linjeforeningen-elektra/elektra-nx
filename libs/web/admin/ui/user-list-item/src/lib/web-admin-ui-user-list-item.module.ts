import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAdminUserListItemComponent } from './web-admin-user-list-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WebAdminUserListItemComponent],
  exports: [WebAdminUserListItemComponent],
})
export class WebAdminUiUserListItemModule {}
