const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  status: {type: String, require: true },
  username: {type: String, require: true },
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true, unique: true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
