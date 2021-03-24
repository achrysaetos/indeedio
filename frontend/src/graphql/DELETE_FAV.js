import gql from "graphql-tag";

export const DELETE_FAV = gql`
  mutation deleteFav($userId: ID!, $favId: ID!) {
    deleteFav(userId: $userId, favId: $favId){
      id
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
