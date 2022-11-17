import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthStore } from '@elektra-nx/web/auth/data-access';
import {
  LayoutService,
  NavbarLayerInstance,
  NavbarService,
  NavdrawerService,
} from '@elektra-nx/web/shared/data-access';
import { map } from 'rxjs';

const OPENED_LAYER = { button: 'arrow_back' };
const CLOSED_LAYER = { button: 'menu' };

@Component({
  selector: 'elektra-nx-navdrawer',
  templateUrl: './navdrawer.component.html',
  styleUrls: ['./navdrawer.component.scss'],
})
export class NavdrawerComponent {
  constructor(
    private layout: LayoutService,
    private readonly navdrawer: NavdrawerService,
    private readonly navbar: NavbarService,
    private auth: AuthStore,
  ) {}

  opened$ = this.navdrawer.state$;
  mode: MatDrawerMode = 'over';
  modeSub = this.layout.breakpoints$
    .pipe(map((bp) => (bp[this.layout.breakpoints.TABLET] ? 'side' : 'over')))
    .subscribe((mode) => (this.mode = mode));

  private readonly closedLayer: NavbarLayerInstance = this.navbar.registerNavbarLayer(CLOSED_LAYER);
  private readonly closedSub = this.closedLayer.buttonClicked$.subscribe(() => {
    this.open();
    this.navdrawer.open();
  });

  private openedLayer?: NavbarLayerInstance;

  stateSub = this.navdrawer.state$.subscribe((opened) => {
    if (opened) {
      // this.open();
    } else {
      this.close();
    }
  });

  user$ = this.auth.user$;
  id$ = this.auth.id$;

  handleClick(): void {
    if (this.mode != 'over') return;
    this.closeAndEmit();
  }

  public closeAndEmit(): void {
    this.close();
    this.navdrawer.close();
  }

  public close(): void {
    this.openedLayer?.release();
  }

  public open(): void {
    this.attachLayer();
  }

  private attachLayer(): void {
    this.openedLayer = this.navbar.registerNavbarLayer(OPENED_LAYER);
    this.openedLayer.buttonClicked$.subscribe(() => {
      this.navdrawer.close();
      this.close();
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
