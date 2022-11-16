import { CardAccessStatus } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface RenewCardAccessVariables {
  cardId: string;
}

export interface RenewCardAccessResult {
  readonly status: CardAccessStatus;
}

export const RenewCardAccessMutation = gql<RenewCardAccessResult, RenewCardAccessVariables>`
  mutation RenewCardAccess($cardId: String!) {
    status: renewCardAccess(cardId: $cardId)
  }
`;
