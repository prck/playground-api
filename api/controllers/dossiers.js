var Dossier = require('../models/dossier');
const _ = require('lodash')

const mongoose = require("mongoose");

/** GET /dossiers */
exports.listDossiers = (req, res) => {
  Dossier
    .find()
    .then(doc => res.status(200).json({ dossiers: doc }))
    .catch(err => res.status(400).json({ error: err }));
}

/** GET /dossiers/:dossierId */
exports.readDossier = (req, res) => {
  const id = req.params.dossierId;
  Dossier
    .findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ dossier: doc });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** POST /dossiers */
exports.createNewDossiers = (req, res) => {
  const dossier = new Dossier({
    _id: new mongoose.Types.ObjectId(),
    libelle: req.body.libelle,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin
  });
  dossier
    .save()
    .then(doc => res.status(201).json({ message: "Created dossier successfully", dossier: doc }))
    .catch(err => res.status(500).json({ error: err }));
}

/** PATCH /dossiers/:dossierId */
exports.partialUpdateDossier = (req, res) => {
  const id = req.params.dossierId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Dossier
    .findByIdAndUpdate(id, { $set: updateOps }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Dossier partially updated", dossier: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** PUT /dossiers/:dossierId */
exports.updateDossier = (req, res) => {
  const id = req.params.dossierId;
  var dossier = _.pick(req.body, ['libelle', 'dateDebut', 'dateFin']);
  Dossier
    .findByIdAndUpdate(id, { $set: dossier }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Dossier updated", dossier: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}

/** DELETE /dossiers/:dossierId */
exports.deleteDossier = (req, res) => {
  const id = req.params.dossierId;
  console.log(id);
  Dossier
    .findByIdAndRemove(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "Dossier removed", dossier: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}