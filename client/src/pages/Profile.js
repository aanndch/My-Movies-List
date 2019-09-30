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
    const {
      username,
      firstName,
      lastName,
      location,
      gender,
      image
    } = this.props;

    return (
      <div className="profile-container">
        <div className="top-part">
          <img src={image} alt={`${username}'s pic`} className="profile-pic" />
          <h1>{username}</h1>
        </div>
        <div className="profile-inputs">
          <TextField
            label="First Name"
            className="profile-input"
            value={firstName}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Last Name"
            className="profile-input"
            value={lastName}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Location"
            className="profile-input"
            value={location}
            // onChange={handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            label="Gender"
            className="profile-input"
            value={gender}
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
  email: searchedUser.email,
  username: searchedUser.username,
  firstName: searchedUser.firstName,
  lastName: searchedUser.lastName,
  location: searchedUser.location,
  gender: searchedUser.gender,
  favorites: searchedUser.favorites,
  watchlist: searchedUser.watchlist,
  watched: searchedUser.watched,
  image: searchedUser.image
});

export default connect(mapStateToProps)(Profile);
