import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAccessComponent } from './card-access.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [CardAccessComponent],
  exports: [CardAccessComponent],
})
export class AccountCardAccessModule {}
