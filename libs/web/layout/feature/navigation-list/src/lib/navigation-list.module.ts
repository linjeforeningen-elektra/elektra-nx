import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationListComponent } from './navigation-list.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

@NgModule({
  imports: [CommonModule, RouterModule, MatRippleModule, MatListModule, MatIconModule],
  declarations: [NavigationListComponent],
  exports: [NavigationListComponent],
})
export class NavigationListModule {}
