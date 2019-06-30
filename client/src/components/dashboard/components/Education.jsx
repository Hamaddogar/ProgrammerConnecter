import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Button, Typography } from "@material-ui/core";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { deleteEducation } from "../../../store/actions/profileActions";

class Education extends Component {
  state = {};

  handleDeleteEducation = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
          )}
        </td>
        <td>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => this.handleDeleteEducation(edu._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <Typography variant='h4' gutterBottom>
          Education Credentials
        </Typography>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
