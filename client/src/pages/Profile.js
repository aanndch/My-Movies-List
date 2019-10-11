import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";

import { updateProfile, getSearchedUserInfo } from "../userInteractions";

import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      location: props.location,
      gender: props.gender
    };
  }

  componentDidMount = () => {
    const { username } = this.props.match.params;
    getSearchedUserInfo(username);
  };

  handleChange = (e, value) => {
    this.setState({
      [value]: e.target.value
    });
  };

  handleClick = () => {
    const { id, token } = this.props;
    const { firstName, lastName, location, gender } = this.state;
    const details = {
      firstName,
      lastName,
      location,
      gender,
      token,
      id
    };
    updateProfile(details);
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      location,
      gender,
      image,
      editProfile
    } = this.props;

    // const editProfile = false;

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
            value={editProfile ? this.state.firstName : firstName}
            onChange={e => this.handleChange(e, "firstName")}
            margin="normal"
            variant="filled"
            disabled={!editProfile}
          />
          <TextField
            label="Last Name"
            className="profile-input"
            value={editProfile ? this.state.lastName : lastName}
            onChange={e => this.handleChange(e, "lastName")}
            margin="normal"
            variant="filled"
            disabled={!editProfile}
          />
          <TextField
            label="Location"
            className="profile-input"
            value={editProfile ? this.state.location : location}
            onChange={e => this.handleChange(e, "location")}
            margin="normal"
            variant="filled"
            disabled={!editProfile}
          />
          <TextField
            label="Gender"
            className="profile-input"
            value={editProfile ? this.state.gender : gender}
            onChange={e => this.handleChange(e, "gender")}
            margin="normal"
            variant="filled"
            disabled={!editProfile}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          className="edit-button"
          onClick={this.handleClick}
        >
          {editProfile ? "SAVE CHANGES" : "EDIT PROFILE"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ searchedUser, user }) => ({
  email: searchedUser.email,
  username: searchedUser.username,
  firstName: searchedUser.firstName,
  lastName: searchedUser.lastName,
  location: searchedUser.location,
  gender: searchedUser.gender,
  favorites: searchedUser.favorites,
  watchlist: searchedUser.watchlist,
  watched: searchedUser.watched,
  image: searchedUser.image,
  id: searchedUser._id,
  token: user.token,
  editProfile: searchedUser.editProfile
});

export default connect(mapStateToProps)(Profile);
