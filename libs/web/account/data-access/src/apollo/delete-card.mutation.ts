import { gql } from 'apollo-angular';

export interface DeleteCardVariables {
  cardId: string;
}

export interface DeleteCardResult {
  readonly card: {
    id: string;
  };
}

export const DeleteCardMutation = gql<DeleteCardResult, DeleteCardVariables>`
  mutation DeleteCard($cardId: String!) {
    card: deleteCard(cardId: $cardId) {
      id
    }
  }
`;
