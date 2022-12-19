import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutShellComponent } from './layout-shell.component';
import { WebLayoutNavbarModule } from '@elektra-nx/web/layout/feature/navbar';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { WebLayoutNavdrawerModule } from '@elektra-nx/web/layout/feature/navdrawer';

@NgModule({
  imports: [CommonModule, WebLayoutNavbarModule, WebLayoutNavdrawerModule, RouterModule, MatDividerModule],
  declarations: [LayoutShellComponent],
  exports: [LayoutShellComponent],
})
export class WebLayoutShellModule {}
