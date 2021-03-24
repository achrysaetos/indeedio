const { AuthenticationError, UserInputError } = require("apollo-server")

const User = require("../../models/User")
const checkAuth = require("../../util/check-auth")

module.exports = {
  Mutation: {
    async createFav(_, { userId, company, title, link, location, posted }, context) {
      const user = checkAuth(context) // check if user is logged in
      const found_user = await User.findById(userId)
      if (found_user){
        found_user.favs.unshift({
          company,
          title,
          link,
          location,
          posted,
          user: user.id,
          createdAt: new Date().toISOString()
        })
        await found_user.save()
        return found_user
      } else {
        throw new UserInputError("User not found")
      }
    },

    async deleteFav(_, { userId, favId }, context) {
      const user = checkAuth(context)
      const found_user = await User.findById(userId)
      if (found_user) {
        const favIndex = found_user.favs.findIndex((f) => f.id === favId)
        found_user.favs.splice(favIndex, 1)
        await found_user.save()
        return found_user
      } else {
          throw new AuthenticationError("Action not allowed")
      }
    }
  }
  
}
