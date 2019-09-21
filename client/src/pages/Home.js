import React, { Component } from "react";
import { connect } from "react-redux";

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
          <p key={movie.id}>{movie.original_title}</p>
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
