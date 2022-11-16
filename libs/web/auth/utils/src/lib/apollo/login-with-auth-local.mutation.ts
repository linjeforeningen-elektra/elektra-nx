import { LoginWithAuthLocalModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

interface LoginWithAuthLocalResult {
  readonly session: {
    access_token: string;
  };
}

interface LoginWithAuthLocalVariables {
  body: LoginWithAuthLocalModel;
}

export const LoginWithAuthLocalMutation = gql<LoginWithAuthLocalResult, LoginWithAuthLocalVariables>`
  mutation LoginWithAuthLocal($body: LoginWithAuthLocalDto!) {
    session: loginWithAuthLocal(body: $body) {
      access_token
    }
  }
`;
