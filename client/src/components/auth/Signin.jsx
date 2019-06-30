import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";

import { loginUser } from "../../store/actions/authActions";
import TextField from "../common/TextField";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Grid container>
        <Grid style={styles.container}>
          <Grid
            item
            md={7}
            style={{ margin: "30px auto", textAlign: "center" }}
          >
            <Typography style={styles.display}>Sign In</Typography>
            <Typography style={styles.subtitle}>
              Sign in to your DevConnector account
            </Typography>
            <TextField
              label='Email Address'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required={true}
              error={errors.email ? true : false}
              errorText={errors.email ? errors.email : false}
            />
            <TextField
              label='Password'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              required={true}
              error={errors.password ? true : false}
              errorText={errors.password ? errors.password : false}
            />
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: "16px" }}
              onClick={this.handleSubmit}
              fullWidth
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  container: {
    width: "71%",
    margin: "0 auto",
    height: "calc(100vh - 131px)"
  },
  display: {
    fontSize: "3.5rem",
    fontWeight: "300"
  },
  subtitle: {
    fontSize: "1.25rem",
    fontWeight: "300"
  }
};

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth,
  errors: store.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Signin);
