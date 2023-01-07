import { gql } from 'apollo-angular';

export interface ResetPasswordByHashMutationResult {
  readonly email: string;
}

export interface ResetPasswordByHashMutationVariables {
  hash: string;
  password: string;
}

export const ResetPasswordByHashMutation = gql<ResetPasswordByHashMutationResult, ResetPasswordByHashMutationVariables>`
  mutation ResetPasswordByHash($hash: String!, $password: String!) {
    email: resetPasswordByHash(hash: $hash, password: $password)
  }
`;
