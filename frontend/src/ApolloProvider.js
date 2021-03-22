import React from "react"
import App from "./App"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"
import { setContext } from "apollo-link-context"

const httpLink = createHttpLink({ uri: "http://localhost:5000" }) // points to the endpoint of your graphql server

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken")
  return {
    headers: { Authorization: token ? `Bearer ${token}` : "" } // create a http header containing the bearer token
  }
})

// client consists of the authorized link to your graphql server and any cached data
const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() })

export default (
  // ApolloProvider connects Apollo Client to React. Here, it lets you request data with the useQuery React hook, 
  // which lets you share GraphQL data with your UI.
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
