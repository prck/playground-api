const express = require("express");
const router = express.Router();

const ListsController = require('../controllers/Lists');
// const { checkAuth } = require('../middleware/check-auth');

router.delete("/:listId", ListsController.deleteList)
router.patch("/:listId", ListsController.partialUpdateList)
router.post("/", ListsController.createList)

module.exports = router;