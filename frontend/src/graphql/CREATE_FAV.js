import gql from "graphql-tag";

export const CREATE_FAV = gql`
  mutation(
    $userId: ID!
    $company: String!
    $title: String!
    $link: String!
    $location: String!
    $posted: String!
  ) {
    createFav(
      userId: $userId
      company: $company
      title: $title
      link: $link
      location: $location
      posted: $posted
  ) {
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
