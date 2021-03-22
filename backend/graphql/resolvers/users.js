const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const { validateRegisterInput, validateLoginInput } = require("../../util/validators")
const { SECRET_KEY } = require("../../config")
const User = require("../../models/User")

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, username: user.username }, SECRET_KEY, { expiresIn: "1h" })
}

module.exports = {
  Query: {
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId)
        if (user) {
          return user
        } else {
          throw new Error("User not found")
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password) // catches errors in login input strings

      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = "User not found"
        throw new UserInputError("User not found", { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = "Wrong password"
        throw new UserInputError("Wrong password", { errors })
      }

      const token = generateToken(user) // create a new token for the user using jwt
      return { ...user._doc, id: user._id, token } // deep copy from user._doc but with custom id and token
    },

    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // check valid input before checking the database
      const { valid, errors } = validateRegisterInput( username, email, password, confirmPassword )

      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError("Username is taken", { errors: { username: "This username is taken" } })
      }

      password = await bcrypt.hash(password, 12)
      const newUser = new User({ email, username, password, createdAt: new Date().toISOString() })
      const res = await newUser.save()
      const token = generateToken(res)

      return { ...res._doc, id: res._id, token }
    }
  }

}
