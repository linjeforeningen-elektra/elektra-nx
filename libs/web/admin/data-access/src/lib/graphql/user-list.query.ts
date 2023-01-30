import { UserModel, FindUserFilterModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

type ListUser = Pick<UserModel, 'id' | 'name' | 'roles'>;

export interface UserListQueryResult {
  readonly users: ListUser[];
}

export interface UserListQueryVariables {
  filter: FindUserFilterModel;
}

export const UserListQuery = gql<UserListQueryResult, UserListQueryVariables>`
  query UserListQuery($filter: FindUsersFilterDto!) {
    users: users(filter: $filter) {
      id
      name
      roles
    }
  }
`;
