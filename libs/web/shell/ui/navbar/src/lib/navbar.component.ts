import { Component } from '@angular/core';
import { LayoutService, WebNavbarService } from '@elektra-nx/web/shared/data-access';
import { map, race } from 'rxjs';

@Component({
  selector: 'elektra-nx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [],
})
export class NavbarComponent {
  constructor(private navbar: WebNavbarService, private layout: LayoutService) {}

  title$ = this.navbar.latestProp$('title');
  noTitleTransition$ = this.navbar.latestProp$('disableTitleTransition');

  button$ = this.navbar.latestProp$('button');
  actions$ = this.navbar.latestProp$('actions');
  theme$ = this.navbar.latestProp$('theme');

  change$ = race(this.title$, this.button$, this.theme$, this.actions$).pipe(map(() => null));

  floating$ = this.theme$.pipe(map((theme) => (theme ? theme.value?.background !== 'transparent' : false)));

  buttonClicked(id: number): void {
    this.navbar._buttonClicked(id);
  }

  actionClicked(id: number, action: string): void {
    this.navbar._actionClicked(id, action);
  }
}
