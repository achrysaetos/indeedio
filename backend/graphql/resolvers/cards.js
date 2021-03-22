const { AuthenticationError, UserInputError } = require("apollo-server")

const User = require("../../models/User")
const checkAuth = require("../../util/check-auth")

module.exports = {
  Mutation: {
    async createCard(_, { userId, cardNumber, cvvNumber, expirationMonth, expirationYear, balanceRemaining }, context) {
      const user = checkAuth(context) // check if user is logged in
      if (cardNumber.trim() === "") {
        throw new Error("Card number must not be empty")
      }
      const found_user = await User.findById(userId)
      if (found_user){
        found_user.cards.unshift({
        cardNumber,
        cvvNumber,
        expirationMonth,
        expirationYear,
        balanceRemaining,
        user: user.id,
        createdAt: new Date().toISOString()
        })
        await found_user.save()
        return found_user
      } else {
        throw new UserInputError("User not found")
      }
    },

    async deleteCard(_, { userId, cardId }, context) {
      const user = checkAuth(context)
      const found_user = await User.findById(userId)
      if (found_user) {
        const cardIndex = found_user.cards.findIndex((c) => c.id === cardId)
        found_user.cards.splice(cardIndex, 1)
        await found_user.save()
        return found_user
      } else {
          throw new AuthenticationError("Action not allowed")
      }
    }
  }
  
}
