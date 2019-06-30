import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowBack } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import { getPost } from "../../store/actions/postActions";
import PostItem from "../posts/components/PostItem";
import CommentForm from "./components/CommentForm";
import CommentFeed from "./components/CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = (
        <div style={{ width: "100%", textAlign: "center", margin: "10px 0" }}>
          <CircularProgress />
        </div>
      );
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link to='/feed' style={{ color: "black", fontSize: "32px" }}>
                <ArrowBack style={{ fontSize: "32px" }} />
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  post: store.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
