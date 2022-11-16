import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavdrawerLinksComponent } from './navdrawer-links.component';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavdrawerLinksComponent],
  imports: [CommonModule, RouterModule, MatListModule, MatDividerModule, MatIconModule],
  exports: [NavdrawerLinksComponent],
})
export class NavdrawerLinksModule {}
