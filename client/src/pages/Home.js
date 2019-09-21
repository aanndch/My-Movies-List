import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getNowPlaying } from "../apiCalls";

class Home extends Component {
  componentDidMount = () => {
    getNowPlaying();
  };

  render() {
    const { nowPlaying } = this.props;

    return (
      <>
        {nowPlaying.map(movie => (
          <Link to={`/movie/${movie.id}`}>
            <p key={movie.id}>{movie.original_title}</p>
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
