const express = require("express");
const imageController = require("../controller/imageController");
const signupController = require("../controller/userController");

const upload = require("../util/upload");

const router = express.Router();

router.post("/signup", signupController.signupUser);
router.post("/login", signupController.loginUser);

//Routes for Image file handling
router.post("/file/upload", upload.single("file"), imageController.uploadImage);
router.get("/file/:filename", imageController.getImage);

router;

module.exports = router;
