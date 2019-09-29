import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";

import { getSearchedUserInfo } from "../userInteractions";

import "./Profile.css";

class Profile extends Component {
  componentDidMount = () => {
    const { username } = this.props.match.params;
    getSearchedUserInfo(username);
  };

  render() {
    const { details } = this.props;

    return (
      <div className="profile-container">
        <div className="top-part">
          <img
            src={details.image}
            alt={`${details.username}'s pic`}
            className="profile-pic"
          />
          <h1>{details.username}</h1>
        </div>
        <div className="profile-inputs">
          <TextField
            label="First Name"
            className="profile-input"
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Last Name"
            className="profile-input"
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Country"
            className="profile-input"
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Gender"
            className="profile-input"
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ searchedUser }) => ({
  details: searchedUser
});

export default connect(mapStateToProps)(Profile);
