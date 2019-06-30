import React, { Component } from "react";
import { Done } from "@material-ui/icons";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";

import isEmpty from "../../../utils/isEmpty";

class ProfileAbout extends Component {
  state = {};
  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.trim().split(" ")[0];
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className='p-3'>
        <Done /> {skill}
      </div>
    ));

    return (
      <div className='row my-3'>
        <div className='col-md-12'>
          <Card>
            <CardContent>
              <Typography variant='h5' align='center' gutterBottom>
                {firstName}'s Bio
              </Typography>
              <p className='lead'>
                {isEmpty(profile.bio) ? (
                  <small>{firstName} does not have bio</small>
                ) : (
                  profile.bio
                )}
              </p>
              <Divider />
              <Typography variant='h5' align='center' className='my-3'>
                Skill Set
              </Typography>
              <div className='row'>
                <div className='d-flex flex-wrap justify-content-center align-items-center'>
                  {skills}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
