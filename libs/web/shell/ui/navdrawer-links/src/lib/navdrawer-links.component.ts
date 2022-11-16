import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { NavdrawerLink, NavdrawerService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-navdrawer-links',
  templateUrl: './navdrawer-links.component.html',
  styleUrls: ['./navdrawer-links.component.scss'],
  animations: [],
})
export class NavdrawerLinksComponent {
  constructor(private router: Router, private navdrawer: NavdrawerService) {}

  groups$ = this.navdrawer.groups$;

  public isLinkActive(link: NavdrawerLink): boolean {
    const url = this.router.url.match(/^\/[^/]+/);
    return link.path == (url ? url[0] : '/');
  }

  public handleRouteClicked(): void {
    //
  }
}
