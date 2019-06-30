import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Button } from "@material-ui/core";

import {
  deletePost,
  addLike,
  removeLike
} from "../../../store/actions/postActions";

class PostItem extends Component {
  handleDeletePost = id => {
    this.props.deletePost(id);
  };

  handleLike = id => {
    this.props.addLike(id);
  };

  handleUnlike = id => {
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-md-2'>
            <a href='profile.html'>
              <Avatar
                src={post.avatar}
                style={{ width: "120px", height: "120px" }}
              />
            </a>
            <br />
            <p className='text-center'>{post.name}</p>
          </div>
          <div className='col-md-10'>
            <p className='lead text-left'>{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type='button'
                  className='btn btn-light mr-1'
                  onClick={() => this.handleLike(post._id)}
                >
                  <i
                    className={`fas fa-thumbs-up ${
                      this.findUserLike(post.likes) ? "text-info" : ""
                    }`}
                  />
                  <span className='badge badge-light'>{post.likes.length}</span>
                </button>
                <button
                  type='button'
                  className='btn btn-light mr-1'
                  onClick={() => this.handleUnlike(post._id)}
                >
                  <i className='text-secondary fas fa-thumbs-down' />
                </button>
                <Link to={`/post/${post._id}`}>
                  <Button
                    variant='contained'
                    color='primary'
                    // style={{ padding: "13px 0" }}
                  >
                    Comments
                  </Button>
                </Link>
                {post.user === auth.user.id ? (
                  <Button
                    variant='contained'
                    color='secondary'
                    style={{ padding: "11px 0", marginLeft: "10px" }}
                    onClick={() => this.handleDeletePost(post._id)}
                  >
                    <i className='fas fa-times' />
                  </Button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
