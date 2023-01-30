import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavdrawerRoute } from '@elektra-nx/web/layout/utils';
import { NavdrawerService, WebAuthService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
})
export class NavigationListComponent implements OnInit {
  constructor(private router: Router, private webAuth: WebAuthService, private navdrawer: NavdrawerService) {}

  routes$ = this.navdrawer.routes$;

  public routeIsActive(link: NavdrawerRoute): boolean {
    return link.path == this.router.url;
  }

  public groupIsActive(links: NavdrawerRoute[]): boolean {
    return links.some((r) => this.routeIsActive(r));
  }

  ngOnInit(): void {}
}
