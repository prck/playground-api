const express = require("express");
const router = express.Router({ mergeParams: true });

const CardsController = require('../controllers/Cards');
// const { checkAuth } = require('../middleware/check-auth');

router.delete("/:cardId", CardsController.deleteCard)
router.patch("/:cardId", CardsController.partialUpdateCard)
router.post("/", CardsController.createCard)
router.get("/:cardId", CardsController.readCard)
router.put("/:cardId", CardsController.updateCard)

module.exports = router;