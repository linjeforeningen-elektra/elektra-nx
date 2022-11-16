import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ACCOUNT_ROUTES } from './account-shell.routes';
import { IsLoggedInGuard } from '@elektra-nx/web/auth/utils';

import { DashboardService } from '@elektra-nx/web/account/data-access';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ACCOUNT_ROUTES)],
  providers: [
    IsLoggedInGuard,
    DashboardService,
    // UpdateMembershipMutation,
    // CreateCardMutation,
    // DeleteCardMutation,
    // RenewCardAccessMutation,
    // CreateMembershipMutation,
  ],
})
export class AccountShellModule {}
