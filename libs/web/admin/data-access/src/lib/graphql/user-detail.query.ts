import { AuthLocalModel, CardAccessStatus, CardModel, MembershipModel, UserModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

type UserDetail = Pick<UserModel, 'id' | 'name' | 'roles' | 'slug' | 'lastSignedIn' | 'createdAt'> & {
  auth_local: Pick<AuthLocalModel, 'id' | 'confirmed' | 'email'>;
} & {
  card: Pick<CardModel, 'student_number'> & { status: CardAccessStatus };
} & {
  membership: Pick<
    MembershipModel,
    | 'id'
    | 'address'
    | 'gender'
    | 'createdAt'
    | 'graduation'
    | 'immatriculation'
    | 'memberyear'
    | 'phone'
    | 'postal_code'
    | 'specialisation'
  >;
};

export interface UserDetailQueryResult {
  readonly user: UserDetail;
}

export interface UserDetailQueryVariables {
  userId: string;
}

export const UserDetailQuery = gql<UserDetailQueryResult, UserDetailQueryVariables>`
  query UserDetailQuery($userId: String!) {
    user: user(userId: $userId) {
      id
      name
      roles
      lastSignedIn
      createdAt
      slug
      auth_local {
        id
        confirmed
        email
      }
      card {
        student_number
        status
      }
      membership {
        id
        address
        gender
        graduation
        immatriculation
        memberyear
        phone
        postal_code
        specialisation
        createdAt
      }
    }
  }
`;
