import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress, Fab, Tooltip, Zoom } from "@material-ui/core";
import { Add, Favorite, Check } from "@material-ui/icons";
import moment from "moment";

import { toggleSelection } from "../../userInteractions";
import { getMovieDetails } from "../../apiCalls";

import "./Movie.css";

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

    const date = moment(details.release_date).format("Do MMM Y");
    const hours = Math.floor(details.runtime / 60);
    const min = details.runtime - hours * 60;

    if (isLoading) return <CircularProgress className="loader" />;

    return (
      <div className="movie-page-container">
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt={details.title}
          className="background-image"
        />
        <div className="movie-info">
          <div className="extra">
            <img
              src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
              alt="TMDB logo"
              className="tmdb-logo"
            />
            <p>{details.vote_average}/10</p>
            <p>|</p>
            {details.genres &&
              details.genres.map(genre => <p key={genre.id}>{genre.name} </p>)}
            <p>|</p>
            <p>{`${hours}h ${min}min`}</p>
          </div>
          <div className="title-buttons">
            <h1>{details.title}</h1>
          </div>
          <p className="release-date">{date}</p>
          <p>{details.overview}</p>
        </div>
        <div className="movie-poster">
          {token && (
            <div className="action-buttons">
              <Tooltip
                TransitionComponent={Zoom}
                title="Watchlist"
                placement="top"
              >
                <Fab
                  className="action-button"
                  style={{
                    color:
                      watchlist &&
                      watchlist
                        .map(movie => parseInt(movie.movieId))
                        .includes(details.id)
                        ? "#31db91"
                        : "#616f7c"
                  }}
                  onClick={() =>
                    this.addToList(
                      details.id,
                      details.title,
                      details.poster_path,
                      "watchlist"
                    )
                  }
                >
                  <Add />
                </Fab>
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                title="Favorite"
                placement="top"
              >
                <Fab
                  className="action-button"
                  onClick={() =>
                    this.addToList(
                      details.id,
                      details.title,
                      details.poster_path,
                      "favorites"
                    )
                  }
                  style={{
                    color:
                      favorites &&
                      favorites
                        .map(movie => parseInt(movie.movieId))
                        .includes(details.id)
                        ? "#31db91"
                        : "#616f7c"
                  }}
                >
                  <Favorite />
                </Fab>
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                title="Watched"
                placement="top"
              >
                <Fab
                  className="action-button"
                  onClick={() =>
                    this.addToList(
                      details.id,
                      details.title,
                      details.poster_path,
                      "watched"
                    )
                  }
                  style={{
                    color:
                      watched &&
                      watched
                        .map(movie => parseInt(movie.movieId))
                        .includes(details.id)
                        ? "#31db91"
                        : "#616f7c"
                  }}
                >
                  <Check />
                </Fab>
              </Tooltip>
            </div>
          )}
          <img
            src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
            alt={details.title}
          />
        </div>
      </div>
    );
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