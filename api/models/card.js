const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')
const Comment = require('../models/comment')

const CardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  text: { type: String, required: true },
  id: { type: String, required: true, index: { unique: true }, default: () => { return Math.random().toString(36).substring(2, 9) } },
  creationDate: { type: Date, default: Date.now },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

// CardSchema.methods.toJSON = function() {
//   var card = this
//   var cardObject = card.toObject()
//   return _.pick(cardObject, ['id', 'name', 'text', 'creationDate', 'userIdCreator', 'comments', 'orderId'])
// }

CardSchema.post('findOneAndRemove', function(doc) {
  // var boardObject = board.toObject()
  const comments = doc.comments
  comments.forEach(commentId => {
    Comment.findByIdAndRemove(commentId).exec()
  });
});

module.exports = mongoose.model('Card', CardSchema)