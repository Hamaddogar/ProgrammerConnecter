import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

import styles from "./landing.module.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className={styles.landing}>
        <div className={styles.darkOverlay}>
          <div className={styles.container}>
            <Typography variant='h1'>Developer Connector</Typography>
            <Typography variant='subtitle1'>
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </Typography>
            <Link to='/signup'>
              <Button variant='contained' size='large' color='primary'>
                Sign Up
              </Button>
            </Link>
            <Link to='/signin'>
              <Button variant='contained' size='large'>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth
});

export default connect(mapStateToProps)(Landing);
