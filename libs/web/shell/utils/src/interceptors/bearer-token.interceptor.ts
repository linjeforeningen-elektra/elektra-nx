import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStore } from '@elektra-nx/web/auth/data-access';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthStore) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.token$.pipe(
      switchMap((token) => {
        if (token) {
          const headers = req.headers.append('Authorization', `Bearer ${token}`);
          return next.handle(req.clone({ headers }));
        }
        return next.handle(req);
      }),
    );
  }
}
