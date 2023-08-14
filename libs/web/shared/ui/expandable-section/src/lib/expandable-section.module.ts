import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableSectionComponent } from './expandable-section.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  declarations: [ExpandableSectionComponent],
  exports: [ExpandableSectionComponent],
})
export class ExpandableSectionModule {}
