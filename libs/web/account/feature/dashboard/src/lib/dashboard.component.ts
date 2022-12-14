import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CreateCardModel, UpdateUserModel } from '@elektra-nx/shared/models';
import { DashboardService } from '@elektra-nx/web/account/data-access';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'elektra-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  constructor(private navbar: WebNavbarService, private title: Title, private dashboard: DashboardService) {
    this.title.setTitle('Profil');
  }

  readonly layer = this.navbar.registerNavbarLayer({
    title: 'Bruker',
    theme: {
      background: 'var(--app-bar)',
      color: 'var(--text)',
    },
  });

  account$ = this.dashboard.account$.pipe(map(({ data }) => data.account));

  updateUser(body: UpdateUserModel) {
    this.dashboard.updateAccountUser(body);
  }

  deleteCard(): void {
    this.dashboard.deleteAccountCard();
  }

  createCard(body: CreateCardModel) {
    this.dashboard.createAccountCard(body);
  }

  renewCardAccess(): void {
    this.dashboard.renewCardAccess();
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
