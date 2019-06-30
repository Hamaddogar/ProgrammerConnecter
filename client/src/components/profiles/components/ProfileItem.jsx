import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Done } from "@material-ui/icons";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

import isEmpty from "../../../utils/isEmpty";

class ProfileItem extends Component {
  state = {};
  render() {
    const { profile } = this.props;

    return (
      <Card className='my-5'>
        <CardContent>
          <div className='row'>
            <div className='col-2'>
              <Hidden xsDown>
                <Avatar src={profile.user.avatar} style={style.avatar} />
              </Hidden>
            </div>
            <div className='col-lg-6 col-md-4 col-8'>
              <Typography variant='h4' gutterBottom>
                {profile.user.name}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </Typography>
              <Typography variant='subtitle1'>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </Typography>
              <Link to={`profile/${profile.handle}`}>
                <Button
                  variant='contained'
                  color='primary'
                  style={style.button}
                >
                  View Profile
                </Button>
              </Link>
            </div>
            <div className='col-md-4'>
              <Hidden smDown>
                <Typography variant='h4'>Skill Set</Typography>
                <List>
                  {profile.skills.slice(0, 5).map((skill, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <Done />
                      </ListItemIcon>
                      <ListItemText>{skill}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Hidden>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const style = {
  button: {
    margin: "10px 0"
  },
  avatar: {
    width: "120px",
    height: "120px"
  }
};

export default ProfileItem;
