const express = require("express");
const signupController = require("../controller/userController");

const router = express.Router();

router.post("/signup", signupController.signupUser);
router.post("/login", signupController.loginUser);

module.exports = router;
