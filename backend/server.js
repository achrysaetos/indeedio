const { ApolloServer } = require("apollo-server") // helps connect a graphql schema to a http server in node
const mongoose = require("mongoose") // helps translate between objects in code and their representation in MongoDB

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const { URI } = require("./config")


// actually create the server with your parameters
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) }) 

mongoose
  .connect(URI, { useNewUrlParser: true }) // link to your database
  .then(() => {
    return server.listen({ port: 5000 }) // tell server which port to listen to
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`) // console log the port
  })
