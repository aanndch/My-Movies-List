import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getNowPlaying } from "../apiCalls";
import { toggleSelection } from "../userInteractions";
import MovieCard from "../components/MovieCard";

import "./Home.css";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  favorite = (id, title, poster) => {
    const { token } = this.props;
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

const mapStateToProps = ({ api, user }) => {
  return {
    nowPlaying: api.nowPlaying,
    token: user.token
  };
};

export default connect(mapStateToProps)(Home);
