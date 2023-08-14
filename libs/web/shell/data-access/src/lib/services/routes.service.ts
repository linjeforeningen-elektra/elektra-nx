import { Injectable } from '@angular/core';
import {
  IsLoggedInGuard,
  NavdrawerService,
  WebIsAdminGuard,
  WebIsSuperAdminGuard,
} from '@elektra-nx/web/shared/data-access';
import { map } from 'rxjs';

@Injectable()
export class WebRoutesService {
  constructor(
    private loggedInGuard: IsLoggedInGuard,
    private adminGuard: WebIsAdminGuard,
    private superAdminGuard: WebIsSuperAdminGuard,
    private navdrawer: NavdrawerService,
  ) {}

  public attachRoutes(): void {
    // default routes
    this.navdrawer.registerRoutes([
      { path: '/', icon: 'home', name: 'Hjem' },
      { path: '/stillingsannonser', icon: 'engineering', name: 'Stillingsannonser' },
    ]);
    // logged in routes
    this.navdrawer.registerRoutes(
      this.loggedInGuard.canActivate().pipe(
        map((loggedIn) =>
          loggedIn
            ? [
                { path: '/konto', icon: 'dashboard', name: 'Oversikt', group: 'Bruker' },
                { path: '/konto/medlemskap', icon: 'settings', name: 'Medlemskap', group: 'Bruker' },
              ]
            : [],
        ),
      ),
    );
    // // admin routes
    this.navdrawer.registerRoutes(
      this.adminGuard.canActivate().pipe(
        map((admin) =>
          admin
            ? [
                { path: '/admin', icon: 'dashboard', name: 'Admin', group: 'Administrator' },
                { path: '/admin/brukere', icon: 'people', name: 'Brukere', group: 'Administrator' },
              ]
            : [],
        ),
      ),
    );
  }
}
