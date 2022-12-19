import { RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface RegisterWithAuthLocalMutationVariables {
  body: RegisterWithAuthLocalModel;
}

export interface RegisterWithAuthLocalMutationResult {
  readonly user: {
    access_token: string;
  };
}

// eslint-disable-next-line
export const RegisterWithAuthLocalMutation = gql<RegisterWithAuthLocalMutationResult, RegisterWithAuthLocalMutationVariables>`
  mutation RegisterWithAuthLocal($body: RegisterWithAuthLocalDto!) {
    user: registerWithAuthLocal(body: $body) {
      access_token
    }
  }
`;
