import React, { Component } from "react";
import { connect } from "react-redux";

import { toggleSelection } from "../../userInteractions";
import { getMovieDetails } from "../../apiCalls";

import MovieDesktop from "./MovieDesktop";
import MovieMobile from "./MovieMobile";

class Movie extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    getMovieDetails(id);
  };

  addToList = (id, title, poster, list) => {
    const { token } = this.props;
    const info = {
      movie: {
        movieId: id,
        title,
        poster
      },
      token,
      list
    };

    toggleSelection(id, info);
  };

  render() {
    const {
      details,
      isLoading,
      favorites,
      watched,
      watchlist,
      token
    } = this.props;

    if (window.innerWidth < 500) {
      return (
        <MovieMobile
          details={details}
          isLoading={isLoading}
          favorites={favorites}
          watched={watched}
          watchlist={watchlist}
          token={token}
          addToList={this.addToList}
        />
      );
    } else {
      return (
        <MovieDesktop
          details={details}
          isLoading={isLoading}
          favorites={favorites}
          watched={watched}
          watchlist={watchlist}
          token={token}
          addToList={this.addToList}
        />
      );
    }
  }
}

const mapStateToProps = ({ user, api, loading }) => {
  return {
    details: api.details,
    loading: api.loading,
    favorites: user.favorites,
    watchlist: user.watchlist,
    watched: user.watched,
    token: user.token,
    isLoading: loading.isLoading
  };
};

export default connect(mapStateToProps)(Movie);
