import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import jwtDecode from 'jwt-decode';
import { EMPTY, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtPayload } from '@elektra-nx/shared/models';
import { LocalStorageService } from '@elektra-nx/web/shared/data-access';

const AUTH_LOCALSTORAGE_KEY = 'elektra-nx.auth-key';

interface AuthState {
  login_attempted: boolean;
  user?: JwtPayload;
  access_token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {
  constructor(private localStorage: LocalStorageService) {
    super({ login_attempted: false });
    this.init();
  }

  user$ = this.select((s) => s.user);
  token$ = this.select((s) => s.access_token);
  id$ = this.select((s) => s.user?.id);

  loggedIn$ = this.state$.pipe(
    filter((state) => state.login_attempted),
    map((state) => !!state.user),
  );

  // readonly login = this.updater<{ access_token: string }>((state, { access_token }) => {
  //   this.setToken(access_token);
  //   const user: BearerTokenPayload = jwtDecode(access_token);
  //   return { ...state, access_token, user };
  // });

  readonly logout = this.updater<void>((state) => {
    // this.router.navigateByUrl('/');
    this.removeToken();
    return { ...state, access_token: undefined, user: undefined };
  });

  readonly init = this.effect((params$) =>
    params$.pipe(
      switchMap(() =>
        this.initAuth().pipe(
          tap({
            next: (state) => this.setState(state),
            error: () => EMPTY,
          }),
        ),
      ),
    ),
  );

  login(access_token: string) {
    this.setToken(access_token);
    const user: JwtPayload = jwtDecode(access_token);
    this.patchState({ user, access_token });
  }

  private setToken(token: string): void {
    this.localStorage.setItem(AUTH_LOCALSTORAGE_KEY, token);
  }

  private removeToken(): void {
    this.localStorage.removeItem(AUTH_LOCALSTORAGE_KEY);
  }

  private getAuthToken(): string | null {
    const token = this.localStorage.getItem(AUTH_LOCALSTORAGE_KEY);

    if (!token || token == '') return null;

    return token;
  }

  // ALDRI KALL DENNE I CONSTRUCTOR
  private initAuth(): Observable<AuthState> {
    const token = this.getAuthToken();

    if (!token || token == '') {
      return of(<AuthState>{ login_attempted: true });
    }

    const payload: JwtPayload = jwtDecode(token);

    if (Date.now() > new Date(payload.exp * 1000).getTime()) {
      this.removeToken();
      return of(<AuthState>{ login_attempted: true });
    }

    return of(<AuthState>{ access_token: token, user: payload, login_attempted: true });
  }
}
