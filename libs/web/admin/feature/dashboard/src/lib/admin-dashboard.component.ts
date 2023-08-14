import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  constructor(private navbar: WebNavbarService) {}

  private layer = this.navbar.registerNavbarLayer({
    title: 'Admin',
  });

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.layer.release();
  }
}
