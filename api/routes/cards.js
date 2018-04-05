const express = require("express");
const router = express.Router({ mergeParams: true });

const CardsController = require('../controllers/Cards');
// const { checkAuth } = require('../middleware/check-auth');

// router.get("/", CardsController.listCards)
router.get("/:cardId", CardsController.readCard)
router.delete("/:cardId", CardsController.deleteCard)
router.patch("/:cardId", CardsController.partialUpdateCard)
// router.put("/:cardId", CardsController.updateCard)
router.post("/", CardsController.createCard)

module.exports = router;