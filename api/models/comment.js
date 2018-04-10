const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')

const CommentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  text: { type: String, required: true },
  id: { type: String, required: true, index: { unique: true }, default: () => { return Math.random().toString(36).substring(2, 9) } },
  creationDate: { type: Date, default: Date.now },
  userIdCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

CommentSchema.methods.toJSON = function() {
  var comment = this
  var commentObject = comment.toObject()
  return _.pick(commentObject, ['id', 'libelle', 'dateDebut', 'dateFin'])
}

module.exports = mongoose.model('Comment', CommentSchema)