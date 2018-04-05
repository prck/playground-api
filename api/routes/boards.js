const express = require("express");
const router = express.Router();

const BoardsController = require('../controllers/Boards');
// const { checkAuth } = require('../middleware/check-auth');

router.get("/", BoardsController.listBoards)
router.get("/:boardId", BoardsController.readBoard)
router.delete("/:boardId", BoardsController.deleteBoard)
router.patch("/:boardId", BoardsController.partialUpdateBoard)
// router.put("/:boardId", BoardsController.updateBoard)
router.post("/", BoardsController.createBoard)

module.exports = router;