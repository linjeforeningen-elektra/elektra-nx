import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [SpinButtonComponent],
  exports: [SpinButtonComponent],
})
export class SpinButtonModule {}
