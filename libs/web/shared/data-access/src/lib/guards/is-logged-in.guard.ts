import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WebAuthService } from '@elektra-nx/web/shared/data-access';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private auth: WebAuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.loggedIn$.pipe(
      map((loggedin) => {
        if (!loggedin) {
          this.router.navigateByUrl('/auth');
          return false;
        }
        return true;
      }),
    );
  }
}
