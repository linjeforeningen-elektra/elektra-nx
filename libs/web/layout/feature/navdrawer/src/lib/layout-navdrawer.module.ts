import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavdrawerComponent } from './layout-navdrawer.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { WebLayoutNavbarModule } from '@elektra-nx/web/layout/feature/navbar';
import { RouterModule } from '@angular/router';
import { NavigationListModule } from '@elektra-nx/web/layout/feature/navigation-list';
import { WebFooterModule } from '@elektra-nx/web/layout/ui/footer';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    WebLayoutNavbarModule,
    RouterModule,
    NavigationListModule,
    WebFooterModule,
  ],
  declarations: [LayoutNavdrawerComponent],
  exports: [LayoutNavdrawerComponent],
})
export class WebLayoutNavdrawerModule {}
