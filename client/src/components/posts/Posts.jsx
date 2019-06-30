import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

import { getPosts } from "../../store/actions/postActions";
import PostForm from "./components/PostForm";
import PostFeed from "./components/PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = (
        <div style={{ width: "100%", textAlign: "center", margin: "10px 0" }}>
          <CircularProgress />
        </div>
      );
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className='feed py-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  post: store.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
