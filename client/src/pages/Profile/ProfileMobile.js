import React from "react";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  Input
} from "@material-ui/core";

import { Search } from "@material-ui/icons";

import TabPanel from "../../components/TabPanel";
import MovieCard from "../../components/MovieCard";

import "./ProfileMobile.css";

const ProfileMobile = props => {
  const {
    username,
    firstName,
    tempFirstName,
    lastName,
    tempLastName,
    location,
    tempLocation,
    gender,
    tempGender,
    image,
    editProfile,
    isLoading,
    watched,
    watchlist,
    favorites,
    tab,
    handleChange,
    handleTabChange,
    submitChanges,
    makeChanges,
    searchUser,
    handleInputChange,
    user,
    currentUser
  } = props;

  if (isLoading) {
    return (
      <div id="loader">
        <CircularProgress />;
      </div>
    );
  }

  return (
    <div className="profile-container mobile-profile">
      <form method="GET" onSubmit={searchUser} className="user-search">
        <Search className="search-icon" />
        <Input
          className="search-input"
          disableUnderline={true}
          placeholder="Search for a user"
          value={user}
          onChange={handleInputChange}
        />
        <input
          type="submit"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px"
          }}
          tabIndex="-1"
        />
      </form>
      <div className="top-part">
        <img src={image} alt={`${username}'s pic`} className="profile-pic" />
        <h1>{username}</h1>
      </div>
      <div className="profile-inputs">
        <TextField
          label="First Name"
          className="profile-input"
          value={editProfile ? tempFirstName : firstName}
          onChange={e => handleChange(e, "firstName")}
          margin="normal"
          variant="filled"
          disabled={!editProfile}
        />
        <TextField
          label="Last Name"
          className="profile-input"
          value={editProfile ? tempLastName : lastName}
          onChange={e => handleChange(e, "lastName")}
          margin="normal"
          variant="filled"
          disabled={!editProfile}
        />
        <TextField
          label="Location"
          className="profile-input"
          value={editProfile ? tempLocation : location}
          onChange={e => handleChange(e, "location")}
          margin="normal"
          variant="filled"
          disabled={!editProfile}
        />
        <TextField
          label="Gender"
          className="profile-input"
          value={editProfile ? tempGender : gender}
          onChange={e => handleChange(e, "gender")}
          margin="normal"
          variant="filled"
          disabled={!editProfile}
        />
        {currentUser === username && (
          <Button
            color="primary"
            variant="contained"
            className="edit-button"
            onClick={editProfile ? submitChanges : makeChanges}
          >
            {editProfile ? "SAVE CHANGES" : "EDIT PROFILE"}
          </Button>
        )}
      </div>
      <Paper
        className="tabs-paper"
        style={{ backgroundColor: "#394956", width: "100%" }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
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
};

export default ProfileMobile;
