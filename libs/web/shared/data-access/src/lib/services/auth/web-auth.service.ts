import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from '@elektra-nx/shared/models';

export interface WebAuthState {
  user?: JwtPayload;
  access_token?: string;
  loginAttempted: boolean;
}

const WEB_AUTH_LOCALSTORAGE_KEY = 'elektra-nx.web-auth-token';

@Injectable({
  providedIn: 'root',
})
export class WebAuthService {
  constructor(@Inject(PLATFORM_ID) private id: any) {}

  private state = new BehaviorSubject<WebAuthState>({ loginAttempted: false });
  public readonly state$ = this.state.asObservable();

  public readonly loggedIn$ = this.state$.pipe(
    filter(({ loginAttempted }) => loginAttempted),
    map(({ user }) => !!user),
  );

  public readonly user$ = this.state$.pipe(map(({ user }) => user));

  public readonly token$ = this.state$.pipe(
    filter(({ loginAttempted }) => loginAttempted),
    map((state) => state.access_token),
  );

  // fix SSR
  private get localStorage(): Window['localStorage'] {
    if (isPlatformBrowser(this.id)) {
      return window['localStorage'];
    }

    return {
      setItem: (key, val) => null,
      getItem: (key) => null,
      clear: () => null,
      removeItem: () => null,
      length: 0,
      key: (idx) => null,
    };
  }

  private get access_token(): string | null {
    return this.localStorage.getItem(WEB_AUTH_LOCALSTORAGE_KEY);
  }

  private setToken(access_token: string): void {
    this.localStorage.setItem(WEB_AUTH_LOCALSTORAGE_KEY, access_token);
  }

  private removeToken(): void {
    this.localStorage.removeItem(WEB_AUTH_LOCALSTORAGE_KEY);
  }

  public init(): void {
    const access_token = this.access_token;
    if (access_token) {
      this.login(access_token);
    } else {
      this.state.next({ loginAttempted: true });
    }
  }

  public login(access_token: string) {
    const user: JwtPayload = jwtDecode(access_token);

    if (Date.now() > new Date(user.exp * 1000).getTime()) {
      this.removeToken();
      this.state.next({ loginAttempted: true });
    } else {
      this.setToken(access_token);
      this.state.next({ access_token, user, loginAttempted: true });
    }
  }
}
