import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar, Button } from "@material-ui/core";

import { deleteComment } from "../../../store/actions/postActions";

class CommentItem extends Component {
  handleDeleteComment = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-md-2'>
            <a href='profile.html'>
              <Avatar
                src={comment.avatar}
                style={{ width: "120px", height: "120px" }}
              />
            </a>
            <br />
            <p className='text-center'>{comment.name}</p>
          </div>
          <div className='col-md-10'>
            <p className='lead text-left ml-3'>{comment.text}</p>
            {comment.user === auth.user.id ? (
              <Button
                variant='contained'
                color='secondary'
                style={{ padding: "11px 0", marginLeft: "10px" }}
                onClick={() => this.handleDeleteComment(postId, comment._id)}
              >
                <i className='fas fa-times' />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
