import gql from "graphql-tag";

export const FETCH_USER = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      createdAt
      favs {
        id
        company
        title
        link
        location
        posted
        createdAt
      }
    }
  }
`;
