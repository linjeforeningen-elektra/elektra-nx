import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ExpandableSectionModule } from '@elektra-nx/web/shared/ui/expandable-section';
import { AccountUserModule } from '@elektra-nx/web/account/ui/user';
import { AccountMembershipModule } from '@elektra-nx/web/account/ui/membership';
import { AccountCardModule } from '@elektra-nx/web/account/ui/card';
import { AccountCardAccessModule } from '@elektra-nx/web/account/ui/card-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    ExpandableSectionModule,
    AccountUserModule,
    AccountMembershipModule,
    AccountCardModule,
    AccountCardAccessModule,
  ],
  declarations: [DashboardComponent],
  providers: [],
})
export class DashboardModule {}
