const express = require("express");
const router = express.Router();

const BoardsController = require('../controllers/Boards');
// const { checkAuth } = require('../middleware/check-auth');

router.delete("/:boardId", BoardsController.deleteBoard)
router.patch("/:boardId", BoardsController.partialUpdateBoard)
router.post("/", BoardsController.createBoard)
router.get("/", BoardsController.listBoards)
router.get("/:boardId", BoardsController.readBoard)
// router.put("/:boardId", BoardsController.updateBoard)

module.exports = router;