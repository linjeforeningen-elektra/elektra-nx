import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WebNavbarService } from '../navbar/navbar.service';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

enum Breakpoints {
  MOBILE = '(min-width: 320px)',
  IMOBILE = '(max-width: 320px)',
  TABLET = '(min-width: 600px)',
  DESKTOP = '(min-width: 900px)',
  DESKTOP_L = '(min-width: 1300px)',
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class WebLayoutService {
  constructor(private readonly navbar: WebNavbarService, private readonly bps: BreakpointObserver) {}

  private theme = new BehaviorSubject<Theme>(Theme.DARK);
  public readonly theme$ = this.theme.asObservable();

  public readonly breakpoints = Breakpoints;

  public readonly breakpoints$: Observable<Record<Breakpoints, boolean>> = this.bps
    .observe(Object.values(this.breakpoints))
    .pipe(map((state) => state.breakpoints as Record<Breakpoints, boolean>));

  public setTheme(theme: Theme) {
    this.theme.next(theme);
  }

  public toggleTheme(): void {
    this.theme.pipe(take(1)).subscribe((theme) => {
      this.theme.next(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    });
  }
  // public registerNavbarLayer<T extends NavbarLayer>(props: Omit<T, 'id'>): NavbarLayerInstance<T> {
  //   return this.navbar.registerNavbarLayer<T>(props);
  // }
}
