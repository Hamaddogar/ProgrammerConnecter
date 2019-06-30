import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Button, Typography } from "@material-ui/core";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { deleteExperience } from "../../../store/actions/profileActions";

class Experience extends Component {
  state = {};

  handleDeleteExperience = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
          )}
        </td>
        <td>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => this.handleDeleteExperience(exp._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <Typography variant='h4' gutterBottom>
          Experience Credentials
        </Typography>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
