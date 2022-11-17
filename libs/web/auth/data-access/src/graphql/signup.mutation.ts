import { RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface SignupMutationResult {
  readonly result: {
    access_token: string;
  };
}

export interface SignupMutationVariables {
  body: RegisterWithAuthLocalModel;
}

export const SignupMutation = gql<SignupMutationResult, SignupMutationVariables>`
  mutation RegisterWithAuthLocal($body: RegisterWithAuthLocalDto!) {
    result: registerWithAuthLocal(body: $body) {
      access_token
    }
  }
`;
