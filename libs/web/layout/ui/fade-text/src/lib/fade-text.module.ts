import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeTextComponent } from './fade-text.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FadeTextComponent],
  exports: [FadeTextComponent],
})
export class FadeTextModule {}
