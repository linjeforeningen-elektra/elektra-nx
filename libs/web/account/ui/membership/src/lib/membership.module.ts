import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipComponent } from './membership.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  declarations: [MembershipComponent],
  exports: [MembershipComponent],
})
export class AccountMembershipModule {}
