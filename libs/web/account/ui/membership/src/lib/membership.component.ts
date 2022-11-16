import { Component, Input } from '@angular/core';
import { AccountMembershipSlice } from '@elektra-nx/web/account/utils';

@Component({
  selector: 'elektra-nx-account-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent {
  @Input()
  membership?: AccountMembershipSlice | null;
}
