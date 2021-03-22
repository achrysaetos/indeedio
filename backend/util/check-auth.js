const { AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")

const { SECRET_KEY } = require("../config")

module.exports = (context) => {
  // get the http header if it exists (which contains the bearer token), else there is no token sent
  const authHeader = context.req.headers.authorization
  
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1] // get the token from "Bearer [token]", else there is no token or it is wrong
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY) // check if the token is ours, else it is invalid or expired
        return user
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token")
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]")
  }
  throw new Error("Authorization header must be provided")
}
