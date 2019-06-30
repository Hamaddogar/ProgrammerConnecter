import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import { addComment } from "../../../store/actions/postActions";
import TextArea from "../../common/TextArea";

class CommentForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-dark text-white'>
            Make a Comment...
          </div>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <TextArea
                  label='Reply to Post'
                  name='text'
                  value={this.state.text}
                  onChange={this.handleChange}
                  error={errors.text ? true : false}
                  errorText={errors.text ? errors.text : false}
                />
              </div>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth,
  errors: store.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
