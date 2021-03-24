const { model, Schema } = require('mongoose')

const favSchema = new Schema({
  company: String,
  title: String,
  link: String,
  location: String,
  posted: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId, // lets you reference documents in other collections
    ref: 'users' // tells mongoose which model to use during population
  }
})

module.exports = model('Fav', favSchema)
