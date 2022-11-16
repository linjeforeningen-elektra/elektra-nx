import { UpdateUserModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface UpdateUserMutationResponse {
  readonly user: {
    id: string;
    name: string;
    slug?: string;
  };
}

export interface UpdateUserMutationVariables {
  userId: string;
  body: UpdateUserModel;
}

export const UpdateUserMutation = gql<UpdateUserMutationResponse, UpdateUserMutationVariables>`
  mutation UpdateUser($userId: String!, $body: UpdateUserDto!) {
    user: updateOneUser(userId: $userId, body: $body) {
      id
      name
      slug
    }
  }
`;
