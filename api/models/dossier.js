const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash')

const DossierSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  libelle: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true }
})

DossierSchema.methods.toJSON = function() {
  var dossier = this
  var dossierObject = dossier.toObject()
  return _.pick(dossierObject, ['_id', 'libelle', 'dateDebut', 'dateFin'])
}

module.exports = mongoose.model('Dossier', DossierSchema)