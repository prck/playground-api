const express = require("express");
const router = express.Router();

const UserController = require('../controllers/User');
// const { checkAuth } = require('../middleware/check-auth');

// router.delete("/:userId", UserController.deleteUser)
router.post("/signin", UserController.signinUser)
router.post("/signup", UserController.signupUser)
// router.post("/me", UserController.me)

module.exports = router;