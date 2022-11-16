import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinButtonComponent } from './spin-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SpinButtonComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [SpinButtonComponent],
})
export class SpinButtonModule {}
