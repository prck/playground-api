const mongoose = require('mongoose');
const _ = require('lodash')

const BoardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  creationDate: { type: Date, required: true },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
})

BoardSchema.methods.toJSON = function() {
  var board = this
  var boardObject = board.toObject()
  return _.pick(boardObject, ['_id', 'name', 'text', 'creationDate', 'userIdCreator', 'lists'])
}

module.exports = mongoose.model('Board', BoardSchema)