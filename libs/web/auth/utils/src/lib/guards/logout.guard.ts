import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private router: Router) {}

  // TODO: Fix SCAM dependency tree
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // const sub = this.auth.loggedIn$.pipe(
    //   filter((e) => e === false),
    //   take(1),
    //   map(() => false),
    //   tap(() => this.router.navigateByUrl('/auth')),
    // );
    // this.auth.logout();
    // return sub;
    return of(true);
  }
}
