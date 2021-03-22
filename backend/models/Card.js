const { model, Schema } = require('mongoose')

const cardSchema = new Schema({
  cardNumber: String,
  cvvNumber: String,
  expirationMonth: String,
  expirationYear: String,
  balanceRemaining: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId, // lets you reference documents in other collections
    ref: 'users' // tells mongoose which model to use during population
  }
})

module.exports = model('Card', cardSchema)
