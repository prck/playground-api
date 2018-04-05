const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')
const Card = require('../models/card')

const ListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
})

ListSchema.methods.toJSON = function() {
  var list = this
  var listObject = list.toObject()
  return _.pick(listObject, ['_id', 'name', 'text', 'creationDate', 'userIdCreator', 'cards'])
}

ListSchema.post('findOneAndRemove', function(doc) {
  // var boardObject = board.toObject()
  const cards = doc.cards
  cards.forEach(cardId => {
    Card.findByIdAndRemove(cardId).exec()
  });
});

module.exports = mongoose.model('List', ListSchema)