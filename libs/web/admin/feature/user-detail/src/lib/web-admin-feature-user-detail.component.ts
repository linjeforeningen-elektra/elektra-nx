import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailQueryResult } from '@elektra-nx/web/admin/data-access';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-web-admin-feature-user-detail',
  templateUrl: './web-admin-feature-user-detail.component.html',
  styleUrls: ['./web-admin-feature-user-detail.component.scss'],
})
export class WebAdminFeatureUserDetailComponent implements OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute, private navbar: WebNavbarService) {}

  private layer = this.navbar.registerNavbarLayer({
    title: '',
    button: 'navigate_before',
  });

  private buttonSub = this.navbar.buttonStream$.subscribe(() => {
    this.router.navigate(['../'], { relativeTo: this.route });
  });

  get data(): UserDetailQueryResult['user'] | { error: 'string' } {
    return (<{ user: UserDetailQueryResult['user'] | { error: 'string' } }>this.route.snapshot.data).user;
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
