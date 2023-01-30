import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@elektra-nx/shared/models';

@Component({
  selector: 'elektra-nx-web-admin-user-list-item',
  templateUrl: './web-admin-user-list-item.component.html',
  styleUrls: ['./web-admin-user-list-item.component.scss'],
})
export class WebAdminUserListItemComponent implements OnInit {
  @Input() user?: Pick<UserModel, 'name' | 'roles'>;

  get name() {
    return this.user?.name || 'N/A';
  }

  get roles() {
    return this.user
      ? this.user.roles.length > 0
        ? this.user.roles.join(', ')
        : this.user.roles.join('')
      : 'NO ROLES';
    // return this.user?.roles?.join(', ');
  }

  ngOnInit(): void {}
}
