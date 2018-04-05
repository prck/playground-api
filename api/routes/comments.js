const express = require("express");
const router = express.Router({ mergeParams: true });

const CommentsController = require('../controllers/Comments');
// const { checkAuth } = require('../middleware/check-auth');

// router.get("/", CommentsController.listComments)
router.delete("/:commentId", CommentsController.deleteComment)
router.patch("/:commentId", CommentsController.partialUpdateComment)
// router.put("/:commentId", CommentsController.updateComment)
router.post("/", CommentsController.createComment)

module.exports = router;