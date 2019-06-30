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

import { addEducation } from "../../store/actions/profileActions";
import styles from "./addcredentials.module.css";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
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
                Add Education
              </Typography>
              <Typography component='p' variant='subtitle1'>
                Add any school, bootcamp etc that you have attended
              </Typography>
              <TextField
                label='School'
                type='text'
                name='school'
                value={this.state.school}
                onChange={this.handleChange}
                required={true}
                error={errors.school ? true : false}
                errorText={errors.school ? errors.school : false}
              />
              <TextField
                label='Degree or Certification'
                type='text'
                name='degree'
                value={this.state.degree}
                onChange={this.handleChange}
                required={true}
                error={errors.degree ? true : false}
                errorText={errors.degree ? errors.degree : false}
              />
              <TextField
                label='Field Of Study'
                type='text'
                name='fieldofstudy'
                value={this.state.fieldofstudy}
                onChange={this.handleChange}
                required={true}
                error={errors.fieldofstudy ? true : false}
                errorText={errors.fieldofstudy ? errors.fieldofstudy : false}
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
                label='Current'
              />
              <TextArea
                label='Program Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  profile: store.profile,
  errors: store.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
