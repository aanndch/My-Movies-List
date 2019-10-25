import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  Typography,
  Box
} from "@material-ui/core";

import { updateProfile, getSearchedUserInfo } from "../userInteractions";
import TabPanel from "../components/TabPanel";
import MovieCard from "../components/MovieCard";

import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      location: props.location,
      gender: props.gender,
      tab: 1
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

  handleTabChange = (e, value) => {
    this.setState({
      tab: value
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
      favorites
    } = this.props;

    const { tab } = this.state;

    if (isLoading) return <CircularProgress className="loader" />;

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
          <Button
            color="primary"
            variant="contained"
            className="edit-button"
            onClick={this.handleClick}
          >
            {editProfile ? "SAVE CHANGES" : "EDIT PROFILE"}
          </Button>
        </div>
        <Paper className="tabs-paper" style={{ backgroundColor: "#394956" }}>
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Watchlist" />
            <Tab label="Watched" />
            <Tab label="Favorites" />
          </Tabs>
          <TabPanel value={tab} index={0} className="movies-tab">
            {watchlist &&
              watchlist.map(movie => (
                <Link
                  key={movie.movieId}
                  to={`/movie/${movie.movieId}`}
                  style={{ textDecoration: "none", margin: "0.8rem" }}
                >
                  <MovieCard
                    key={movie.movieId}
                    title={movie.title}
                    poster={movie.poster}
                  />
                </Link>
              ))}
          </TabPanel>
          <TabPanel value={tab} index={1} className="movies-tab">
            {watched &&
              watched.map(movie => (
                <Link
                  key={movie.movieId}
                  to={`/movie/${movie.movieId}`}
                  style={{ textDecoration: "none", margin: "0.8rem" }}
                >
                  <MovieCard
                    key={movie.movieId}
                    title={movie.title}
                    poster={movie.poster}
                  />
                </Link>
              ))}
          </TabPanel>
          <TabPanel value={tab} index={2} className="movies-tab">
            {favorites &&
              favorites.map(movie => (
                <Link
                  key={movie.movieId}
                  to={`/movie/${movie.movieId}`}
                  style={{ textDecoration: "none", margin: "0.8rem" }}
                >
                  <MovieCard
                    key={movie.movieId}
                    title={movie.title}
                    poster={movie.poster}
                  />
                </Link>
              ))}
          </TabPanel>
        </Paper>
      </div>
    );
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
  isLoading: loading.isLoading
});

export default connect(mapStateToProps)(Profile);
