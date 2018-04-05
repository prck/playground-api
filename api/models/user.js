const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  avatarHash: { type: String },
})

UserSchema.methods.toJSON = function() {
  var user = this
  var userObject = user.toObject()
  return _.pick(userObject, ['_id', 'email', 'fullName', 'avatarHash'])
}

module.exports = mongoose.model('User', UserSchema)