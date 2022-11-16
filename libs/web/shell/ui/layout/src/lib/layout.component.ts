import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { map } from 'rxjs';

import { PaddingAnimation } from './animations/padding.animation';
import { DialogService, NavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [PaddingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  constructor(private navbar: NavbarService, private dialog: DialogService) {}

  @HostBinding('class.dark-theme') dark = false;

  padding$ = this.navbar.latestProp$('theme').pipe(map((layer) => layer?.value?.background !== 'transparent'));
}
