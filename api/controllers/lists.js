const Board = require('../models/board');
const List = require('../models/list');
const mongoose = require("mongoose");
const _ = require('lodash')

/** DELETE /lists/:listId */
exports.deleteList = (req, res) => {
  const listId = req.params.listId;
  List
    .findOneAndRemove({ id: listId })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "List removed", list: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PATCH /lists/:listId */
exports.partialUpdateList = (req, res) => {
  const listId = req.params.listId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  List
    .findOneAndUpdate({ id: listId }, { $set: updateOps }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "List partially updated", list: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** POST /lists */
exports.createList = (req, res) => {
  const boardId = req.params.boardId;
  const list = new List({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    text: req.body.text,
  });
  Board
    .findOneAndUpdate({ id: boardId }, { $push: { lists: list._id } }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        list
          .save()
          .then(doc => res.status(201).json({ message: "Created list successfully", list: doc }))
          .catch(err => res.status(500).json({ error: err }));
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PUT /lists/:listId */
/*
exports.updateList = (req, res) => {
  const listId = req.params.listId;
  var list = _.pick(req.body, ['libelle', 'dateDebut', 'dateFin']);
  List
    .findByIdAndUpdate(listId, { $set: list }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "List updated", list: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}
*/

/** GET /lists/:listId */
/*
exports.readList = (req, res) => {
  const listId = req.params.listId;
  List
    .findById(listId)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ list: doc });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}
*/

/** GET /lists */
/*
exports.listLists = (req, res) => {
  List
    .find()
    .then(doc => res.status(200).json({ lists: doc }))
    .catch(err => res.status(400).json({ error: err }));
}
*/