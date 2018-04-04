const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')

const ListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  creationDate: { type: Date, required: true },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
})

ListSchema.methods.toJSON = function() {
  var list = this
  var listObject = list.toObject()
  return _.pick(listObject, ['_id', 'name', 'text', 'creationDate', 'userIdCreator', 'cards'])
}

module.exports = mongoose.model('List', ListSchema)