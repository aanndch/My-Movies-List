import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress, Typography, Box } from "@material-ui/core";

import { updateProfile, getSearchedUserInfo } from "../../userInteractions";
import Store from "../../store";

import { EDIT_PROFILE } from "../../actions/types";
import ProfileMobile from "./ProfileMobile";
import ProfileDesktop from "./ProfileDesktop";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      user: "",
      firstName: "",
      lastName: "",
      location: "",
      gender: ""
    };
  }

  componentDidMount = () => {
    const { username } = this.props.match.params;
    getSearchedUserInfo(username);
  };

  componentDidUpdate = prevProps => {
    const newProps = this.props;
    if (
      prevProps.firstName !== newProps.firstName ||
      prevProps.lastName !== newProps.lastName ||
      prevProps.location !== newProps.location ||
      prevProps.gender !== newProps.gender ||
      prevProps.match.params.username !== newProps.match.params.username
    ) {
      this.setState({
        firstName: newProps.firstName,
        lastName: newProps.lastName,
        location: newProps.location,
        gender: newProps.gender
      });
      getSearchedUserInfo(newProps.match.params.username);
    }
  };

  handleInputChange = e => {
    this.setState({
      user: e.target.value
    });
  };

  searchUser = e => {
    e.preventDefault();
    const { history } = this.props;
    const { user } = this.state;

    history.push(`/profile/${user}`);
  };

  handleChange = (e, value) => {
    this.setState({
      [value]: e.target.value
    });
  };

  handleTabChange = (e, value) => {
    this.setState({
      tab: value
    });
  };

  makeChanges = () => Store.dispatch({ type: EDIT_PROFILE });

  submitChanges = () => {
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

  TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      location,
      gender,
      image,
      editProfile,
      isLoading,
      watched,
      watchlist,
      favorites,
      currentUser
    } = this.props;

    const { tab, user } = this.state;

    if (isLoading)
      return (
        <div id="loader">
          <CircularProgress />;
        </div>
      );

    if (window.innerWidth < 769) {
      return (
        <ProfileMobile
          username={username}
          firstName={firstName}
          tempFirstName={this.state.firstName}
          lastName={lastName}
          tempLastName={this.state.lastName}
          location={location}
          tempLocation={this.state.location}
          gender={gender}
          tempGender={this.state.gender}
          image={image}
          editProfile={editProfile}
          isLoading={isLoading}
          watched={watched}
          watchlist={watchlist}
          favorites={favorites}
          tab={tab}
          handleChange={this.handleChange}
          handleTabChange={this.handleTabChange}
          submitChanges={this.submitChanges}
          makeChanges={this.makeChanges}
          searchUser={this.searchUser}
          handleInputChange={this.handleInputChange}
          user={user}
          currentUser={currentUser}
        />
      );
    } else {
      return (
        <ProfileDesktop
          username={username}
          firstName={firstName}
          tempFirstName={this.state.firstName}
          lastName={lastName}
          tempLastName={this.state.lastName}
          location={location}
          tempLocation={this.state.location}
          gender={gender}
          tempGender={this.state.gender}
          image={image}
          editProfile={editProfile}
          isLoading={isLoading}
          watched={watched}
          watchlist={watchlist}
          favorites={favorites}
          tab={tab}
          handleChange={this.handleChange}
          handleTabChange={this.handleTabChange}
          submitChanges={this.submitChanges}
          makeChanges={this.makeChanges}
          searchUser={this.searchUser}
          handleInputChange={this.handleInputChange}
          user={user}
          currentUser={currentUser}
        />
      );
    }
  }
}

const mapStateToProps = ({ searchedUser, user, loading }) => ({
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
  editProfile: searchedUser.editProfile,
  isLoading: loading.isLoading,
  currentUser: user.username
});

export default connect(mapStateToProps)(Profile);
