import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, CircularProgress, Button } from "@material-ui/core";

import styles from "./dashboard.module.css";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProfileActions from "./components/ProfileActions";
import {
  getCurrentProfile,
  deleteAccount
} from "../../store/actions/profileActions";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = (
        <div style={{ width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Typography variant='h6'>
              Welcome{" "}
              <Link
                className={styles.profilea}
                to={`/profile/${profile.handle}`}
              >
                {user.name}
              </Link>
            </Typography>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <Button
              onClick={this.handleDeleteAccount}
              variant='contained'
              color='secondary'
            >
              Delete My Account
            </Button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <Typography variant='h6'>Welcome {user.name}</Typography>
            <p style={{ textAlign: "left" }}>
              You have not set up your profile yet
            </p>
            <Link to='/create-profile'>
              <Button variant='contained' size='large' color='primary'>
                Create Profile
              </Button>
            </Link>
          </div>
        );
      }
    }

    return (
      <div className='dashboard' style={{ padding: "20px 0" }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Typography component='h1' variant='h2' gutterBottom>
                Dashboard
              </Typography>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  profile: store.profile,
  auth: store.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
