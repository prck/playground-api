const Board = require('../models/board');
const mongoose = require("mongoose");
const _ = require('lodash')

/** GET /boards */
exports.listBoards = (req, res) => {
  Board
    .find()
    .populate('userIdCreator')
    .then(doc => res.status(200).json({ boards: doc }))
    .catch(err => res.status(400).json({ error: err }));
}

/** GET /boards/:boardId */
exports.readBoard = (req, res) => {
  const boardId = req.params.boardId;
  Board
    .findOne({ id: boardId })
    .populate({
      path: 'lists',
      populate: [{
        path: 'cards',
        populate: {
          path: 'userIdCreator'
        }
      }, {
        path: 'userIdCreator'
      }]
    })
    .populate('userIdCreator')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ board: doc });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** POST /boards */
exports.createBoard = (req, res) => {
  const board = new Board({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    text: req.body.text
  });
  board
    .save()
    .then(doc => res.status(201).json({ message: "Created board successfully", board: doc }))
    .catch(err => res.status(500).json({ error: err }));
}

/** PATCH /boards/:boardId */
exports.partialUpdateBoard = (req, res) => {
  const boardId = req.params.boardId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Board
    .findOneAndUpdate({ id: boardId }, { $set: updateOps }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Board partially updated", board: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** DELETE /boards/:boardId */
exports.deleteBoard = (req, res) => {
  const boardId = req.params.boardId;
  Board
    .findOneAndRemove({ id: boardId })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Board removed", board: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PUT /boards/:boardId */
/*
exports.updateBoard = (req, res) => {
  const boardId = req.params.boardId;
  var board = _.pick(req.body, ['libelle', 'dateDebut', 'dateFin']);
  Board
    .findByIdAndUpdate(boardId, { $set: board }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Board updated", board: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}
*/