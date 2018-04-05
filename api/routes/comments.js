const express = require("express");
const router = express.Router({ mergeParams: true });

const CommentsController = require('../controllers/Comments');
// const { checkAuth } = require('../middleware/check-auth');

router.delete("/:commentId", CommentsController.deleteComment)
router.patch("/:commentId", CommentsController.partialUpdateComment)
router.post("/", CommentsController.createComment)

module.exports = router;