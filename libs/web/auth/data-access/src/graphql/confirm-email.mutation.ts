import { ConfirmEmailModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface ConfirmEmailMutationVariables {
  body: ConfirmEmailModel;
}

export interface ConfirmEmailMutationResult {
  readonly user: {
    access_token: string;
  };
}

export const ConfirmEmailMutation = gql<ConfirmEmailMutationResult, ConfirmEmailMutationVariables>`
  mutation ConfirmEmailAddress($body: ConfirmEmailDto!) {
    user: confirmEmailAddress(body: $body) {
      access_token
    }
  }
`;
