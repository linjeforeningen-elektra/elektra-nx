import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthStore } from '@elektra-nx/web/auth/data-access';
import { Injectable } from '@angular/core';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private auth: AuthStore, private router: Router) {}
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
