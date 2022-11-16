import { UpdateMembershipModel } from '@elektra-nx/shared/models';
import { AccountMembershipSlice } from '@elektra-nx/web/account/utils';
import { gql } from 'apollo-angular';

export interface UpdateMembershipVariables {
  membershipId: string;
  body: UpdateMembershipModel;
}

export interface UpdateMembershipResult {
  readonly membership: AccountMembershipSlice;
}

export const UpdateMembershipMutation = gql<UpdateMembershipResult, UpdateMembershipVariables>`
  mutation UpdateMembership($membershipId: String!, $body: UpdateMembershipDto!) {
    membership: updateMembership(membershipId: $membershipId, body: $body) {
      phone
      address
      postal_code
      memberyear
      immatriculation
      graduation
      confirmed
      specialisation
      gender
      id
    }
  }
`;
