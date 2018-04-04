const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')

const CardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  creationDate: { type: Date, required: true },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

CardSchema.methods.toJSON = function() {
  var card = this
  var cardObject = card.toObject()
  return _.pick(cardObject, ['_id', 'name', 'text', 'creationDate', 'userIdCreator', 'comments'])
}

module.exports = mongoose.model('Card', CardSchema)