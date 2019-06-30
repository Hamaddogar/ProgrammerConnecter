import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowBack } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import { getProfileByHandle } from "../../store/actions/profileActions";

import ProfileHeader from "./components/ProfileHeader";
import ProfileAbout from "./components/ProfileAbout";
import ProfileCreds from "./components/ProfileCreds";
import ProfileGithub from "./components/ProfileGithub";

class Profile extends Component {
  state = {};

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = (
        <div style={{ width: "100%", textAlign: "center", margin: "10px 0" }}>
          <CircularProgress />
        </div>
      );
    } else {
      profileContent = (
        <div>
          <div className='row'>
            <div className='col-md-6 my-3'>
              <Link to='/profiles' style={{ color: "black" }}>
                <ArrowBack style={{ fontSize: "32px" }} />
              </Link>
            </div>
            <div className='col-md-6' />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  profile: store.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
