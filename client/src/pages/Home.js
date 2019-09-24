import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import { getNowPlaying } from "../apiCalls";
import { toggleSelection } from "../userInteractions";
import { logoutUser } from "../actions/registrationActions";
import MovieCard from "../components/MovieCard";

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
        <h1 className="home-heading">In Theaters</h1>
        <div className="movie-cards">
          {nowPlaying.map(movie => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none" }}
            >
              <MovieCard
                title={movie.original_title}
                poster={movie.poster_path}
                rating={movie.vote_average}
              />
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
