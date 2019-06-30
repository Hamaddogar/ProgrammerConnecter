import React from "react";

import CommentItem from "./CommentItem";

const CommentFeed = ({ comments, postId }) =>
  comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ));

export default CommentFeed;
