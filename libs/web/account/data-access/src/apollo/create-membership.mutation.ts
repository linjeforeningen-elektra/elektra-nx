import { UpdateMembershipModel as CreateMembershipModel } from '@elektra-nx/shared/models';
import { AccountMembershipSlice } from '@elektra-nx/web/account/utils';
import { gql } from 'apollo-angular';

export interface CreateMembershipVariables {
  userId: string;
  body: CreateMembershipModel;
}

export interface CreateMembershipResult {
  readonly membership: AccountMembershipSlice;
}

export const CreateMembershipMutation = gql<CreateMembershipResult, CreateMembershipVariables>`
  mutation CreateMembership($userId: String!, $body: CreateMembershipDto!) {
    membership: createMembership(userId: $userId, body: $body) {
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
