import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Grid, Typography, FormHelperText, Button } from "@material-ui/core";

import styles from "./createprofile.module.css";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
import Input from "../common/Input";
import Select from "../common/Select";
import { createProfile } from "../../store/actions/profileActions";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
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
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: "Developer", value: "Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className={styles.createprofile}>
        <Grid container alignContent='center'>
          <Grid item md={8} className={styles.container}>
            <Grid item lg={8} sm={10} className={styles.container}>
              <Typography component='h1' variant='h2' gutterBottom>
                Create Your Profile
              </Typography>
              <Typography variant='subtitle1'>
                Let's get some information to make your profile stand out
              </Typography>
              <TextField
                label='Profile Handle'
                type='text'
                name='handle'
                value={this.state.handle}
                onChange={this.handleChange}
                required={true}
                error={errors.handle ? true : false}
                errorText={errors.handle ? errors.handle : false}
              />
              <FormHelperText>
                A unique handle for your profile URL. Your full name, company
                name, nickname, etc
              </FormHelperText>
              <Select
                label='Select Professional Status'
                name='status'
                options={options}
                value={this.state.status}
                onChange={this.handleChange}
                error={errors.status ? true : false}
                errorText={errors.status ? errors.status : false}
              />
              <FormHelperText>
                Give us an idea of where you are at in your career
              </FormHelperText>
              <TextField
                label='Company'
                type='text'
                name='company'
                value={this.state.company}
                onChange={this.handleChange}
                error={errors.company ? true : false}
                errorText={errors.company ? errors.company : false}
              />
              <FormHelperText>
                Could be your own company or one you work for
              </FormHelperText>
              <TextField
                label='Website'
                type='text'
                name='website'
                value={this.state.website}
                onChange={this.handleChange}
                error={errors.website ? true : false}
                errorText={errors.website ? errors.website : false}
              />
              <FormHelperText>
                Could be your own or a company website
              </FormHelperText>
              <TextField
                label='Location'
                type='text'
                name='location'
                value={this.state.location}
                onChange={this.handleChange}
                error={errors.location ? true : false}
                errorText={errors.location ? errors.location : false}
              />
              <FormHelperText>
                City & state suggested (eg. Boston, MA)
              </FormHelperText>
              <TextField
                label='Skills'
                type='text'
                name='skills'
                value={this.state.skills}
                required={true}
                onChange={this.handleChange}
                error={errors.skills ? true : false}
                errorText={errors.skills ? errors.skills : false}
              />
              <FormHelperText>
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </FormHelperText>
              <TextField
                label='Github Username'
                type='text'
                name='githubusername'
                value={this.state.githubusername}
                onChange={this.handleChange}
                error={errors.githubusername ? true : false}
                errorText={
                  errors.githubusername ? errors.githubusername : false
                }
              />
              <FormHelperText>
                If you want your latest repos and a Github link, include your
                username
              </FormHelperText>
              <TextArea
                label='Short Bio'
                name='bio'
                value={this.state.bio}
                onChange={this.handleChange}
                error={errors.bio ? true : false}
                errorText={errors.bio ? errors.bio : false}
              />
              <FormHelperText>Tell us a little about yourself</FormHelperText>
              <Button
                onClick={() =>
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }))
                }
              >
                Add Social Network Links
              </Button>
              {displaySocialInputs ? (
                <div>
                  <Input
                    label='Twitter Profile URL'
                    name='twitter'
                    placeholder='Twitter Profile URL'
                    icon='fab fa-twitter'
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    error={errors.twitter ? true : false}
                    errorText={errors.twitter ? errors.twitter : false}
                  />
                  <Input
                    label='Facebook Profile URL'
                    name='facebook'
                    placeholder='Facebook Profile URL'
                    icon='fab fa-facebook'
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    error={errors.facebook ? true : false}
                    errorText={errors.facebook ? errors.facebook : false}
                  />
                  <Input
                    label='Linkedin Profile URL'
                    name='linkedin'
                    placeholder='Linkedin Profile URL'
                    icon='fab fa-linkedin'
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    error={errors.linkedin ? true : false}
                    errorText={errors.linkedin ? errors.linkedin : false}
                  />
                  <Input
                    label='Youtube Profile URL'
                    name='youtube'
                    placeholder='Youtube Profile URL'
                    icon='fab fa-youtube'
                    value={this.state.youtube}
                    onChange={this.handleChange}
                    error={errors.youtube ? true : false}
                    errorText={errors.youtube ? errors.youtube : false}
                  />
                  <Input
                    label='Instagram Profile URL'
                    name='instagram'
                    placeholder='Instagram Profile URL'
                    icon='fab fa-instagram'
                    value={this.state.instagram}
                    onChange={this.handleChange}
                    error={errors.instagram ? true : false}
                    errorText={errors.instagram ? errors.instagram : false}
                  />
                </div>
              ) : null}
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleSubmit}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  profile: store.profile,
  errors: store.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
