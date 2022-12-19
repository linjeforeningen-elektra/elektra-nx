import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { map } from 'rxjs';

import { PaddingAnimation } from './animations/padding.animation';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [PaddingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  constructor(private navbar: WebNavbarService) {}

  @ViewChild('wrapper', { static: true, read: ElementRef }) private wrapper: ElementRef<HTMLElement>;

  @HostBinding('class.dark-theme') dark = false;

  padding$ = this.navbar.latestProp$('theme').pipe(map((layer) => layer?.value?.background !== 'transparent'));
}
