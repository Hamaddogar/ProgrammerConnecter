import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import { addPost } from "../../../store/actions/postActions";
import TextArea from "../../common/TextArea";

class PostForm extends Component {
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
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-dark text-white'>Say Somthing...</div>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <TextArea
                  label='Create a Post'
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth,
  errors: store.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
