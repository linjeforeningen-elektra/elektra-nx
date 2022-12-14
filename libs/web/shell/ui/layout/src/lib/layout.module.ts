import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';

import { NavbarModule } from '@elektra-nx/web/shell/ui/navbar';
import { NavdrawerModule } from '@elektra-nx/web/shell/ui/navdrawer';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WebFooterModule } from '@elektra-nx/web/layout/ui/footer';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, NavbarModule, NavdrawerModule, WebFooterModule, RouterModule, MatSnackBarModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
