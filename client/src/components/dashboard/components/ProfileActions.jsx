import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AccountCircle, Work, School } from "@material-ui/icons";

import styles from "../dashboard.module.css";

const ProfileActions = () => {
  return (
    <div className={styles.profileactions}>
      <Link to='/edit-profile'>
        <Button>
          <AccountCircle />
          Edit Profile
        </Button>
      </Link>
      <Link to='/add-experience'>
        <Button>
          <Work />
          Add Experience
        </Button>
      </Link>
      <Link to='/add-education'>
        <Button>
          <School />
          Add Education
        </Button>
      </Link>
    </div>
  );
};

export default ProfileActions;
