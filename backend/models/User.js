const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  cards: [
    {
      cardNumber: String,
      cvvNumber: String,
      expirationMonth: String,
      expirationYear: String,
      balanceRemaining: String,
      createdAt: String,
    }
  ]
})

module.exports = model('User', userSchema)
