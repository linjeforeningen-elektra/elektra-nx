import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavdrawerRoute, routeSerializer } from '@forprosjekt/web/layout/utils';
import { WebAuthService } from '@forprosjekt/web/shared/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'forprosjekt-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
})
export class NavigationListComponent {
  constructor(private router: Router, private webAuth: WebAuthService) {}

  routes$ = this.webAuth.loggedIn$.pipe(map((isLoggedIn) => routeSerializer(isLoggedIn)));

  public routeIsActive(link: NavdrawerRoute): boolean {
    return link.path == this.router.url;
  }

  public groupIsActive(links: NavdrawerRoute[]): boolean {
    return links.some((r) => this.routeIsActive(r));
  }
}
