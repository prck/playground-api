const Card = require('../models/card');
const List = require('../models/list');
const mongoose = require("mongoose");
const _ = require('lodash')

/** GET /cards/:cardId */
exports.readCard = (req, res) => {
  const cardId = req.params.cardId;
  Card
    .findOne({ id: cardId })
    .populate('comments')
    .populate('userIdCreator')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ card: doc });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** POST /cards */
exports.createCard = (req, res) => {
  const listId = req.body.listId;
  const card = new Card({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    text: req.body.text,
  });
  List
    .findOneAndUpdate({ id: listId }, { $push: { cards: card._id } }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        card
          .save()
          .then(doc => res.status(201).json({ message: "Created card successfully", card: doc }))
          .catch(err => res.status(500).json({ error: err }));
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/**
 * name
 * text
 * orderId
 * transfert list
 */
/** PUT /cards/:cardId */
exports.updateCard = (req, res) => {
  const cardId = req.params.cardId;
  const updateOps = {};
  for (const ops of req.body) {
    if (ops.propName !== "id") {
      updateOps[ops.propName] = ops.value;
    }
  }
  Card
    .findOne({ id: cardId })
    .then(card => {
      if (card) {
        const cardObjectId = card._id
        List
          .findOneAndUpdate({ id: updateOps.previousListId }, {
            $pullAll: { cards: [cardObjectId] }
          }, {
            new: true
          })
          .exec()
          .then(doc => {
            if (doc) {
              List.findOneAndUpdate({ id: updateOps.listId }, {
                  $push: {
                    cards: {
                      $each: [cardObjectId],
                      $position: updateOps.index
                    }
                  }
                }, { new: true })
                .exec()
                .then(doc => {
                  if (doc) {
                    res.status(200).json({ message: "Card partially updated", card: card, });
                  } else {
                    res.status(404).json({ message: 'No valid entry found for provided ID' });
                  }
                })
                .catch(err => res.status(500).json({ error: err }));
            } else {
              res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
          })
          .catch(err => res.status(500).json({ error: err }));
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PATCH /cards/:cardId */
exports.partialUpdateCard = (req, res) => {
  const cardId = req.params.cardId;
  const updateOps = {};
  for (const ops of req.body) {
    if (ops.propName !== "id") {
      updateOps[ops.propName] = ops.value;
    }
  }
  Card
    .findOneAndUpdate({ id: cardId }, { $set: updateOps }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Card partially updated", card: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** DELETE /cards/:cardId */
exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  Card
    .findOnedAndRemove({ id: cardId })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Card removed", card: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PUT /cards/:cardId */
// exports.updateCard = (req, res) => {
//   const cardId = req.params.cardId;
//   var card = _.pick(req.body, ['libelle', 'dateDebut', 'dateFin']);
//   Card
//     .findByIdAndUpdate(cardId, { $set: card }, { new: true })
//     .exec()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json({ message: "Card updated", card: doc, });
//       } else {
//         res.status(404).json({ message: 'No valid entry found for provided ID' });
//       }
//     })
//     .catch(err => res.status(500).json({ error: err }));
// }

/** GET /cards */
// exports.listCards = (req, res) => {
//   Card
//     .find()
//     .then(doc => res.status(200).json({ cards: doc }))
//     .catch(err => res.status(400).json({ error: err }));
// }