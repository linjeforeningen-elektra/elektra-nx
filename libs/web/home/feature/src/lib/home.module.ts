import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule.forChild([{ path: '', component: HomeComponent }])],
  declarations: [HomeComponent],
})
export class HomeModule {}
