import { CardAccessStatus, CardModel, MembershipModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

export interface AccountResponse {
  readonly account: {
    id: string;
    name: string;
    slug?: string;
    roles: string[];
    membership?: Omit<MembershipModel, 'ownerId' | 'updatedAt' | 'createdAt'>;
    card?: Pick<CardModel, 'id' | 'student_number'> & { status: CardAccessStatus };
  };
}

export const AccountGQLQuery = gql<AccountResponse, null>`
  query AccountQuery {
    account: loggedInUser {
      id
      name
      slug
      roles
      membership {
        id
        phone
        address
        postal_code
        memberyear
        immatriculation
        graduation
        specialisation
        gender
      }
      card {
        id
        student_number
        status
      }
    }
  }
`;
