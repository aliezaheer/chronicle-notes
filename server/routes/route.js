const express = require("express");
const signupController = require("../controller/signupController");

const router = express.Router();

router.get("/signup", signupController.signupUser);

module.exports = router;
