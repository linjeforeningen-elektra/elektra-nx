import { RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface RegisterWithAuthLocalMutationVariables {
  body: RegisterWithAuthLocalModel;
}

export interface RegisterWithAuthLocalMutationResult {
  readonly email: string;
}

// eslint-disable-next-line
export const RegisterWithAuthLocalMutation = gql<RegisterWithAuthLocalMutationResult, RegisterWithAuthLocalMutationVariables>`
  mutation RegisterWithAuthLocal($body: RegisterWithAuthLocalDto!) {
    email: registerWithAuthLocal(body: $body)
  }
`;
