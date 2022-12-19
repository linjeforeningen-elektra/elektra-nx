import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import {
  LayoutService,
  NavbarLayerInstance,
  WebNavbarService,
  NavdrawerService,
} from '@elektra-nx/web/shared/data-access';
import { filter, map } from 'rxjs';

const OPENED_LAYER = { button: 'arrow_back' };
const CLOSED_LAYER = { button: 'menu' };

@Component({
  selector: 'elektra-nx-navdrawer',
  templateUrl: './navdrawer.component.html',
  styleUrls: ['./navdrawer.component.scss'],
})
export class NavdrawerComponent implements OnInit {
  constructor(
    private layout: LayoutService,
    private readonly navdrawer: NavdrawerService,
    private readonly navbar: WebNavbarService,
    private router: Router,
  ) {}

  @ViewChild('wrapper', { static: true, read: ElementRef }) private wrapper: ElementRef<HTMLElement>;

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

  // user$ = this.auth.user$;
  // id$ = this.auth.id$;

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
    // this.auth.logout();
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.wrapper.nativeElement.scroll({ top: 0 });
    });
  }
}
