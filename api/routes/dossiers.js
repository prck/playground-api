const express = require("express");
const router = express.Router();

const DossiersController = require('../controllers/Dossiers');
const { checkAuth } = require('../middleware/check-auth');

router.get("/", DossiersController.listDossiers)
router.get("/:dossierId", DossiersController.readDossier)
router.delete("/:dossierId", DossiersController.deleteDossier)
router.patch("/:dossierId", DossiersController.partialUpdateDossier)
router.put("/:dossierId", DossiersController.updateDossier)
router.post("/", DossiersController.createNewDossiers)

module.exports = router;