import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavdrawerComponent } from './navdrawer.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NavdrawerLinksModule } from '@elektra-nx/web/shell/ui/navdrawer-links';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavdrawerComponent],
  imports: [CommonModule, NavdrawerLinksModule, MatSidenavModule, MatIconModule, MatButtonModule, RouterModule],
  exports: [NavdrawerComponent],
})
export class NavdrawerModule {}
