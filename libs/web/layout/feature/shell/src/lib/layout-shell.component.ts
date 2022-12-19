import { Component } from '@angular/core';
import { NavbarService } from '@forprosjekt/web/shared/data-access';

@Component({
  selector: 'forprosjekt-layout-shell',
  templateUrl: './layout-shell.component.html',
  styleUrls: ['./layout-shell.component.scss'],
})
export class LayoutShellComponent {
  constructor(private navbar: NavbarService) {}
}
