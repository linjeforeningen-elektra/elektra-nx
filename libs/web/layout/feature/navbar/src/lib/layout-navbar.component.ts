import { animate, style, transition, trigger, group } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';
import { distinctUntilChanged, fromEvent, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'elektra-nx-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss'],
  animations: [
    trigger('testanim', [
      transition('void => *', [
        style({ width: 0, opacity: 0 }),
        group([animate('75ms ease-in', style({ width: '*' })), animate('75ms 75ms ease-in', style({ opacity: 1 }))]),
      ]),
      transition('* => void', [
        style({ width: '*', opacity: 1 }),
        group([animate('75ms ease-out', style({ opacity: 0 })), animate('75ms 75ms ease-out', style({ width: 0 }))]),
      ]),
    ]),
  ],
})
export class LayoutNavbarComponent {
  constructor(private navbar: WebNavbarService, @Inject(PLATFORM_ID) private id: any) {}

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
