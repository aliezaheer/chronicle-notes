const express = require("express");
const imageController = require("../controller/imageController");
const signupController = require("../controller/userController");

import upload from "../util/upload";

const router = express.Router();

router.post("/signup", signupController.signupUser);
router.post("/login", signupController.loginUser);
router.post("/file/upload", upload.single("file"), imageController.uploadImage);

module.exports = router;
