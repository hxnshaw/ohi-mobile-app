const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  createComment,
} = require("../controllers/posts");

const router = new express.Router();

router
  .route("/")
  .post(auth, authorize("author"), createPost)
  .get(auth, authorize("admin", "author", "user"), getAllPosts);

router
  .route("/:id")
  .get(auth, authorize("admin", "author", "user"), getPost)
  .patch(auth, updatePost)
  .delete(auth, authorize("admin"), deletePost);

router.route("/:id/comment").post(auth, createComment);

module.exports = router;
