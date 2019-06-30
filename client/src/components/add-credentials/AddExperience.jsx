import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";

import { addExperience } from "../../store/actions/profileActions";
import styles from "./addcredentials.module.css";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";

class AddExperience extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
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
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  handleCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className={styles.addcredentials}>
        <Grid container alignContent='center'>
          <Grid item md={8} className={styles.container}>
            <Grid item lg={8} sm={10} className={styles.container}>
              <Link to='/dashboard' style={{ color: "black" }}>
                <ArrowBack />
              </Link>
              <Typography component='h1' variant='h2' gutterBottom>
                Add Experience
              </Typography>
              <Typography component='p' variant='subtitle1'>
                Add any job or position that you have had in the past or current
              </Typography>
              <TextField
                label='Company'
                type='text'
                name='company'
                value={this.state.company}
                onChange={this.handleChange}
                required={true}
                error={errors.company ? true : false}
                errorText={errors.company ? errors.company : false}
              />
              <TextField
                label='Job Title'
                type='text'
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
                required={true}
                error={errors.title ? true : false}
                errorText={errors.title ? errors.title : false}
              />
              <TextField
                label='Location'
                type='text'
                name='location'
                value={this.state.location}
                onChange={this.handleChange}
                error={errors.location ? true : false}
                errorText={errors.location ? errors.location : false}
              />
              <h6 style={{ margin: ".5rem 0 0 0", fontSize: "1rem" }}>
                From Date
              </h6>
              <TextField
                type='date'
                name='from'
                value={this.state.from}
                onChange={this.handleChange}
                error={errors.from ? true : false}
                errorText={errors.from ? errors.from : false}
              />
              <h6 style={{ margin: ".5rem 0 0 0", fontSize: "1rem" }}>
                To Date
              </h6>
              <TextField
                type='date'
                name='to'
                value={this.state.to}
                onChange={this.handleChange}
                error={errors.to ? true : false}
                errorText={errors.to ? errors.to : false}
                disabled={this.state.disabled ? true : false}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    color='primary'
                  />
                }
                label='Current Job'
              />
              <TextArea
                label='Job Description'
                name='description'
                value={this.state.description}
                onChange={this.handleChange}
                error={errors.description ? true : false}
                errorText={errors.description ? errors.description : false}
              />
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  profile: store.profile,
  errors: store.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
