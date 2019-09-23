import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import { Button, Card } from "@material-ui/core";
import { getNowPlaying } from "../apiCalls";
import { toggleSelection } from "../userInteractions";
import { logoutUser } from "../actions/registrationActions";

import "./Home.css";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  logout = () => {
    const { logoutUser } = this.props;
    Cookie.remove("token");
    logoutUser();
    window.location.reload(false);
  };

  favorite = (id, title, poster) => {
    const token = Cookie.get("token");
    const info = {
      movie: {
        movieId: id,
        title,
        poster
      },
      token,
      list: "favorites"
    };

    toggleSelection(id, info);
  };

  render() {
    const { nowPlaying } = this.props;

    return (
      <div className="home-container">
        <div className="now-playing">
          {nowPlaying.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Card className="movie-card">
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
                <div className="movie-rating">{movie.vote_average}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return {
    nowPlaying: api.nowPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
