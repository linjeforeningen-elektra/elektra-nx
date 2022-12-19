import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

import { NavbarService, WebAuthService } from '@forprosjekt/web/shared/data-access';
import { NavbarLayerInstance } from '@forprosjekt/web/shared/utils';

@Component({
  selector: 'forprosjekt-layout-navdrawer',
  templateUrl: './layout-navdrawer.component.html',
  styleUrls: ['./layout-navdrawer.component.scss'],
})
export class LayoutNavdrawerComponent implements OnInit {
  constructor(private bpo: BreakpointObserver, private navbar: NavbarService, private webAuth: WebAuthService) {
    this.init();
  }
  readonly user$ = this.webAuth.user$;

  private baseNavbarLayer = this.navbar.registerNavbarLayer(
    {
      theme: {
        background: 'var(--primary)',
        color: 'var(--primary-contrast)',
      },
    },
    0,
  );

  closedLayer = this.navbar.registerNavbarLayer(
    {
      button: 'menu',
    },
    1,
  );

  closedButtonSub = this.closedLayer.buttonClicked$.subscribe(() => {
    this.opened = true;
    this.attachOpenLayer();
  });

  openLayer?: NavbarLayerInstance;

  isMobile = false;
  opened = false;

  private attachOpenLayer(): void {
    this.openLayer = this.navbar.registerNavbarLayer(
      {
        button: 'clear',
      },
      2,
    );

    this.openLayer.buttonClicked$.subscribe(() => {
      this.openLayer?.release();
      this.opened = false;
    });
  }

  handleBackdropClick(): void {
    this.openLayer?.release();
    this.opened = false;
  }

  private init() {
    this.bpo
      .observe('(min-width: 1300px)')
      .pipe(map((state) => state.breakpoints['(min-width: 1300px)']))
      .subscribe((isDesktop) => {
        if (isDesktop) {
          this.openLayer?.hide();
          this.closedLayer.hide();
          this.opened = true;
        } else {
          this.openLayer?.show();
          this.closedLayer.show();
        }
      });
  }

  ngOnInit(): void {
    this.bpo
      .observe('(max-width: 800px)')
      .pipe(map((state) => state.breakpoints['(max-width: 800px)']))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
      });
  }
}
