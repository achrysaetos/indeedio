import gql from "graphql-tag";

export const CREATE_CARD_MUTATION = gql`
  mutation(
    $userId: ID!
    $cardNumber: String!
    $cvvNumber: String!
    $expirationMonth: String!
    $expirationYear: String!
    $balanceRemaining: String!
  ) {
    createCard(
      userId: $userId
      cardNumber: $cardNumber
      cvvNumber: $cvvNumber
      expirationMonth: $expirationMonth
      expirationYear: $expirationYear
      balanceRemaining: $balanceRemaining
  ) {
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
