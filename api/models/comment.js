const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')

const CommentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  creationDate: { type: Date, required: true },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

CommentSchema.methods.toJSON = function() {
  var comment = this
  var commentObject = comment.toObject()
  return _.pick(commentObject, ['_id', 'libelle', 'dateDebut', 'dateFin'])
}

module.exports = mongoose.model('Comment', CommentSchema)