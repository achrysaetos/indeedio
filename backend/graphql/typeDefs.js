const { gql } = require("apollo-server")

/*
type [Object] -- list of fields that represents an object that an application client might need to interact with
type Query -- list of available commands that allows clients to fetch the objects that exist in our data graph
type Mutation -- list of available commands that allows clients to modify data
*/
module.exports = gql`
  type Fav {
    id: ID!
    company: String!
    title: String!
    link: String!
    location: String!
    posted: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    favs: [Fav]!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  
  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createFav(
      userId: ID!, 
      company: String!,
      title: String!,
      link: String!,
      location: String!,
      posted: String!
    ): User!
    deleteFav(userId: ID!, favId: ID!): User!
  }
`
