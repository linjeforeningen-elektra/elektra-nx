import { gql } from 'apollo-angular';

export interface CreatePasswordResetMutationResult {
  readonly email: string;
}

export interface CreatePasswordResetMutationVariables {
  email: string;
}

export const CreatePasswordResetMutation = gql<CreatePasswordResetMutationResult, CreatePasswordResetMutationVariables>`
  mutation CreatePasswordReset($email: String!) {
    email: createPasswordReset(email: $email)
  }
`;
