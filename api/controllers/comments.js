const Comment = require("../models/comment");
const Card = require('../models/card');
const mongoose = require("mongoose");
const _ = require('lodash')

/** POST /cards/:cardId/comments */
exports.createComment = (req, res) => {
  const cardId = req.params.cardId;
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    text: req.body.text,
    creationDate: req.body.creationDate
  });
  Card
    .findByIdAndUpdate(cardId, { $push: { comments: comment._id } }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        comment
          .save()
          .then(doc => res.status(201).json({ message: "Created comment successfully", comment: doc }))
          .catch(err => res.status(500).json({ error: err }));
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PATCH /cards/:cardId/comments/:commentId */
exports.partialUpdateComment = (req, res) => {
  const commentId = req.params.commentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Comment
    .findByIdAndUpdate(commentId, { $set: updateOps }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Comment partially updated", comment: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** DELETE /cards/:cardId/comments/:commentId */
exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  Comment
    .findByIdAndRemove(commentId)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Comment removed", comment: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PUT /cards/:cardId/comments/:commentId */
// exports.updateComment = (req, res) => {
//   const commentId = req.params.commentId;
//   var comment = _.pick(req.body, ['libelle', 'dateDebut', 'dateFin']);
//   Comment
//     .findByIdAndUpdate(commentId, { $set: comment }, { new: true })
//     .exec()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json({ message: "Comment updated", comment: doc, });
//       } else {
//         res.status(404).json({ message: 'No valid entry found for provided ID' });
//       }
//     })
//     .catch(err => res.status(500).json({ error: err }));
// }

/** GET /cards/:cardId/comments */
// exports.listComments = (req, res) => {
//   Comment
//     .find()
//     .then(doc => res.status(200).json({ comments: doc }))
//     .catch(err => res.status(400).json({ error: err }));
// }

/** GET /cards/:cardId/comments/:commentId */
// exports.readComment = (req, res) => {
//   const commentId = req.params.commentId;
//   Comment
//     .findById(commentId)
//     .exec()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json({ comment: doc });
//       } else {
//         res.status(404).json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => res.status(500).json({ error: err }));
// }