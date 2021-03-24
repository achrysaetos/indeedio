const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  favs: [
    {
      company: String,
      title: String,
      link: String,
      location: String,
      posted: String,
      createdAt: String,
    }
  ]
})

module.exports = model('User', userSchema)
