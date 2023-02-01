import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailQueryResult } from '@elektra-nx/web/admin/data-access';

@Component({
  selector: 'elektra-nx-web-admin-feature-user-detail',
  templateUrl: './web-admin-feature-user-detail.component.html',
  styleUrls: ['./web-admin-feature-user-detail.component.scss'],
})
export class WebAdminFeatureUserDetailComponent {
  constructor(private route: ActivatedRoute) {}

  get data(): UserDetailQueryResult['user'] | { error: 'string' } {
    return (<{ user: UserDetailQueryResult['user'] | { error: 'string' } }>this.route.snapshot.data).user;
  }
}
