import React, { Component } from "react";
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

import isEmpty from "../../../utils/isEmpty";

class ProfileHeader extends Component {
  state = {};
  render() {
    const { profile } = this.props;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardContent>
              <div className='row'>
                <div className='col-4 col-md-3 m-auto'>
                  <Avatar src={profile.user.avatar} style={style.avatar} />
                </div>
              </div>
              <Typography variant='h4' align='center' gutterBottom>
                {profile.user.name}
              </Typography>
              <Typography variant='body1' gutterBottom>
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </Typography>
              <Typography variant='body1'>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </Typography>
              <p className='text-center my-3'>
                {isEmpty(profile.website) ? null : (
                  <a
                    className='text-dark p-2'
                    href={profile.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fas fa-globe fa-2x' />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className='text-dark p-2'
                    href={profile.social.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-twitter fa-2x' />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className='text-dark p-2'
                    href={profile.social.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-facebook fa-2x' />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className='text-dark p-2'
                    href={profile.social.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-linkedin fa-2x' />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className='text-dark p-2'
                    href={profile.social.youtube}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-youtube fa-2x' />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className='text-dark p-2'
                    href={profile.social.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-instagram fa-2x' />
                  </a>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

const style = {
  avatar: {
    width: "240px",
    height: "240px"
  }
};

export default ProfileHeader;
