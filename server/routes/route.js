const express = require("express");
const imageController = require("../controller/imageController");
const postConroller = require("../controller/postConroller");
const signupController = require("../controller/userController");
const jwtController = require("../controller/jwtController");

const upload = require("../util/upload");

const router = express.Router();

router.post("/signup", signupController.signupUser);
router.post("/login", signupController.loginUser);
router.post(
  "/create",
  jwtController.authenticateToken,
  postConroller.createPost
);

//Routes for Image file handling
router.post("/file/upload", upload.single("file"), imageController.uploadImage);
router.get("/file/:filename", imageController.getImage);

router.get(
  "/posts",
  jwtController.authenticateToken,
  postConroller.getAllPosts
);

module.exports = router;
