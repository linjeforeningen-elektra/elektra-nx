import { CreateCardModel } from '@elektra-nx/shared/models';
import { AccountCardSlice } from '@elektra-nx/web/account/utils';
import { gql } from 'apollo-angular';

export interface CreateCardVariables {
  userId: string;
  body: CreateCardModel;
}

export interface CreateCardResult {
  readonly card: AccountCardSlice;
}

export const CreateCardMutation = gql<CreateCardResult, CreateCardVariables>`
  mutation CreateCard($userId: String!, $body: CreateCardDto!) {
    card: createCard(userId: $userId, body: $body) {
      id
      student_number
      status
    }
  }
`;
