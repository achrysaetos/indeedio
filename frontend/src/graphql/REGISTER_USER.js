import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
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
