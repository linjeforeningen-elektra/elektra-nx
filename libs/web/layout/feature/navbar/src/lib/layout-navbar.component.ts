import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarService } from '@forprosjekt/web/shared/data-access';
import { distinctUntilChanged, fromEvent, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'forprosjekt-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss'],
})
export class LayoutNavbarComponent {
  constructor(private navbar: NavbarService, @Inject(PLATFORM_ID) private id: any) {}

  button$ = this.navbar.latestProp$('button');
  title$ = this.navbar.latestProp$('title');

  private theme$ = this.navbar.latestProp$('theme');

  backgroundColor$ = this.theme$.pipe(map((prop) => (prop?.value ? prop.value.background : '#FFF')));
  color$ = this.theme$.pipe(map((prop) => (prop?.value ? prop.value.color : '#000')));
  elevation$ = of(isPlatformBrowser(this.id)).pipe(
    switchMap((isBrowser) =>
      isBrowser
        ? fromEvent(window, 'scroll').pipe(
            map(() => {
              return window.scrollY > 0;
            }),
            startWith(false),
          )
        : of(false),
    ),
    distinctUntilChanged(),
  );

  emitButton(id: string) {
    this.navbar._buttonClicked(id);
  }
}
