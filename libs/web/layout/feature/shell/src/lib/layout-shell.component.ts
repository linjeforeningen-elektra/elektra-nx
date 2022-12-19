import { Component } from '@angular/core';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-layout-shell',
  templateUrl: './layout-shell.component.html',
  styleUrls: ['./layout-shell.component.scss'],
})
export class LayoutShellComponent {
  constructor(private navbar: WebNavbarService) {}
}
