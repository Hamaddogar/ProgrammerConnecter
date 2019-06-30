const Profile = require("../models/Profile");
const Post = require("../models/Post");
const validatePostInput = require("../validation/postValidation");

// Get Posts
exports.getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404));
};

// Get Post by ID
exports.getPostById = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.json(post))
    .catch(err => res.status(404));
};

// Create Post
exports.createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user._id
  });

  newPost.save().then(post => res.json(post));
};

// Delete Post
exports.deletePost = (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() != req.user._id) {
          return res.status(401).json({ error: "user not authroized" });
        }
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ error: "No Post found" }));
  });
};

// Like Post
exports.likePost = (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() == req.user._id)
            .length > 0
        ) {
          return res.status(400).json({ error: "User already like this post" });
        }
        post.likes.unshift({ user: req.user._id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ error: "No Post found" }));
  });
};

// Unlike Post
exports.unLikePost = (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() == req.user._id)
            .length === 0
        ) {
          return res.status(400).json({ error: "You have not like this post" });
        }
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user._id);

        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ error: "No Post found" }));
  });
};

// Post Comment
exports.postComment = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user._id
      };
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ error: "No Post Found" }));
};

// Delete Comment
exports.deleteComment = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() == req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ error: "Comment does not exist" });
      }
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ error: "No Comment Found" }));
};
