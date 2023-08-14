import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';
import { WebAuthService } from '@elektra-nx/web/shared/data-access';
import { AccessRole } from '@elektra-nx/shared/models';

@Injectable()
export class WebIsAdminGuard implements CanActivate {
  constructor(private auth: WebAuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user) => (user ? user.roles.some((r) => r === AccessRole.ADMIN || r === AccessRole.SUPER_ADMIN) : false)),
    );
  }
}
