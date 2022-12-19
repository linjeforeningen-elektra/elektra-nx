import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavdrawerComponent } from './layout-navdrawer.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WebLayoutNavbarModule } from '@forprosjekt/web/layout/feature/navbar';
import { RouterModule } from '@angular/router';
import { NavigationListModule } from '@forprosjekt/web/layout/feature/navigation-list';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    WebLayoutNavbarModule,
    RouterModule,
    NavigationListModule,
  ],
  declarations: [LayoutNavdrawerComponent],
  exports: [LayoutNavdrawerComponent],
})
export class WebLayoutNavdrawerModule {}
