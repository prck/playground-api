const mongoose = require('mongoose');
const _ = require('lodash')
// const List = require('mongoose').model('List')
// var List = require('../models/list');

const BoardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  creationDate: { type: Date, required: true },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorizedUserId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
  // lists: [List.schema]
})

BoardSchema.methods.toJSON = function() {
  var board = this
  var boardObject = board.toObject()
  return _.pick(boardObject, ['_id', 'name', 'text', 'creationDate', 'userIdCreator', 'lists'])
}

module.exports = mongoose.model('Board', BoardSchema)