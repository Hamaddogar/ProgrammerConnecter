const express = require("express");
const passport = require("passport");

require("../../config/passport")(passport);
const postControllers = require("../../controllers/posts");

const router = express.Router();

// Get Posts
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postControllers.getPosts
);

// Get Post by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.getPostById
);

// create Post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postControllers.createPost
);

// Delete Post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.deletePost
);

// like Post
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.likePost
);

// Unlike Post
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.unLikePost
);

// Post Comment
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  postControllers.postComment
);

// Delete Comment
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.deleteComment
);

module.exports = router;
