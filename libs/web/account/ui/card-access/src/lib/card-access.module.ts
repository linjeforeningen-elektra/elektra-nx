import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAccessComponent } from './card-access.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [CardAccessComponent],
  exports: [CardAccessComponent],
})
export class AccountCardAccessModule {}
