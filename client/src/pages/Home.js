import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getNowPlaying, getMovieDetails } from "../apiCalls";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  setMovieDetails = id => {
    getMovieDetails(id);
  };

  render() {
    const { nowPlaying } = this.props;

    return (
      <>
        {nowPlaying.map(movie => (
          <Link to={`/movie/${movie.id}`}>
            <p key={movie.id} onClick={() => this.setMovieDetails(movie.id)}>
              {movie.original_title}
            </p>
          </Link>
        ))}
      </>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return {
    nowPlaying: api.nowPlaying
  };
};

export default connect(mapStateToProps)(Home);
