# Fullstack Boilerplate

A fully functional boilerplate for any fullstack web app, built with Node, React, MongoDB, ChakraUI, and GraphQL.

Authentication has already been handled for you, so you can jump straight to the dashboard and start building (don't forget to add your config file with the `URI` and `SECRET_KEY`)!

However, you still need to personalize the backend graphql models (`backend/models/`), the backend graphql resolvers and typeDefs (`backend/graphql/`), and the frontend graphql queries (`frontend/src/graphql/`) -- these should be your main first steps.


## Important directories

**backend/** -- set up your database, create the rules for queries and mutations, and authorize the user

**frontend/** -- set up the client interface and connect to your backend, handle verification of users and create pages and their components, and write queries/mutations, helper functions, and styles for the parts of your app

