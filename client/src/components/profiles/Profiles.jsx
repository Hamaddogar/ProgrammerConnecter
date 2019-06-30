import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgress, Typography } from "@material-ui/core";

import ProfileItem from "./components/ProfileItem";
import { getProfiles } from "../../store/actions/profileActions";

class Profiles extends Component {
  state = {};

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = (
        <div style={{ width: "100%", textAlign: "center", margin: "10px 0" }}>
          <CircularProgress />
        </div>
      );
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles Found...</h4>;
      }
    }

    return (
      <div className='profiles'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Typography
                className='mt-3'
                variant='h2'
                align='center'
                gutterBottom
              >
                Developer Profiles
              </Typography>
              <Typography variant='body1'>
                Browse and connect with developers
              </Typography>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  profile: store.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
