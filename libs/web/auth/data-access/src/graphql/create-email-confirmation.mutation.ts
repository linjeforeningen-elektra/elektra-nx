import { gql } from 'apollo-angular';

export interface CreateEmailConfirmationMutationResult {
  readonly email: string;
}

export interface CreateEmailConfirmationMutationVariables {
  email: string;
}

export const CreateEmailConfirmationMutation = gql<
  CreateEmailConfirmationMutationResult,
  CreateEmailConfirmationMutationVariables
>`
  mutation CreateEmailConfirmation($email: String!) {
    email: createEmailConfirmation(email: $email)
  }
`;
