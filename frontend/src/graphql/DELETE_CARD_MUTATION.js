import gql from "graphql-tag";

export const DELETE_CARD_MUTATION = gql`
  mutation deleteCard($userId: ID!, $cardId: ID!) {
    deleteCard(userId: $userId, cardId: $cardId){
      id
      cards {
        id
        cardNumber
        cvvNumber
        expirationMonth
        expirationYear
        balanceRemaining
        createdAt
      }
    }
  }
`;
