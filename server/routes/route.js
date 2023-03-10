const express = require("express");
const imageController = require("../controller/imageController");
const postConroller = require("../controller/postConroller");
const signupController = require("../controller/userController");
const commentController = require("../controller/commentController");
const jwtController = require("../controller/jwtController");

const upload = require("../util/upload");

const router = express.Router();

router.post("/signup", signupController.signupUser);
router.post("/login", signupController.loginUser);

//Routes for Image file handling
router.post("/file/upload", upload.single("file"), imageController.uploadImage);
router.get("/file/:filename", imageController.getImage);

// Routes for Blog post handling
router.get(
  "/posts",
  jwtController.authenticateToken,
  postConroller.getAllPosts
);

router.get("/post/:id", jwtController.authenticateToken, postConroller.getPost);

router.post(
  "/create",
  jwtController.authenticateToken,
  postConroller.createPost
);

router.put(
  "/update/:id",
  jwtController.authenticateToken,
  postConroller.updatePost
);
router.delete(
  "/delete/:id",
  jwtController.authenticateToken,
  postConroller.deletePost
);

// comments routes handling
router.post(
  "/comment/new",
  jwtController.authenticateToken,
  commentController.newComment
);
router.get(
  "/comments/:id",
  jwtController.authenticateToken,
  commentController.getComments
);

router.delete(
  "/comment/delete/:id",
  jwtController.authenticateToken,
  commentController.deleteComment
);

module.exports = router;
