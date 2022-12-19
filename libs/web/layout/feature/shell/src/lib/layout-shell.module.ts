import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutShellComponent } from './layout-shell.component';
import { WebLayoutNavbarModule } from '@elektra-nx/web/layout/feature/navbar';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { WebLayoutNavdrawerModule } from '@elektra-nx/web/layout/feature/navdrawer';
import { WebFooterModule } from '@elektra-nx/web/layout/ui/footer';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    WebLayoutNavbarModule,
    WebLayoutNavdrawerModule,
    RouterModule,
    MatDividerModule,
    WebFooterModule,
    MatSnackBarModule,
  ],
  declarations: [LayoutShellComponent],
  exports: [LayoutShellComponent],
})
export class WebLayoutShellModule {}
