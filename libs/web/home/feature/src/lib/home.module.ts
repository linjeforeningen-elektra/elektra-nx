import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule.forChild([{ path: '', component: HomeComponent }])],
  declarations: [HomeComponent],
})
export class HomeModule {}
