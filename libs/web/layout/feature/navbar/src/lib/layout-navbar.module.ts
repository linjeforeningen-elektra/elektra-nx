import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavbarComponent } from './layout-navbar.component';
import { SpinButtonModule } from '@forprosjekt/web/layout/ui/spin-button';
import { FadeTextModule } from '@forprosjekt/web/layout/ui/fade-text';

import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [CommonModule, SpinButtonModule, FadeTextModule, MatDividerModule],
  declarations: [LayoutNavbarComponent],
  exports: [LayoutNavbarComponent],
})
export class WebLayoutNavbarModule {}
