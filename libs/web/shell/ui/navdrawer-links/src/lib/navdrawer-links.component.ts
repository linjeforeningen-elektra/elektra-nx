import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { WebLayoutService, NavdrawerLink, NavdrawerService } from '@elektra-nx/web/shared/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'elektra-nx-navdrawer-links',
  templateUrl: './navdrawer-links.component.html',
  styleUrls: ['./navdrawer-links.component.scss'],
  animations: [],
})
export class NavdrawerLinksComponent {
  constructor(private router: Router, private navdrawer: NavdrawerService, private layout: WebLayoutService) {}

  groups$ = this.navdrawer.groups$;

  mode: MatDrawerMode = 'over';
  modeSub = this.layout.breakpoints$
    .pipe(map((bp) => (bp[this.layout.breakpoints.TABLET] ? 'side' : 'over')))
    .subscribe((mode) => (this.mode = mode));

  public isLinkActive(link: NavdrawerLink): boolean {
    const url = this.router.url.match(/^\/[^/]+/);
    return link.path == (url ? url[0] : '/');
  }

  public handleRouteClicked(): void {
    if (this.mode !== 'over') return;
    this.navdrawer.close();
  }
}
