import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieDetails } from "../apiCalls";
import { CircularProgress, Fab } from "@material-ui/core";
import { Add, Favorite, Check } from "@material-ui/icons";

import "./Movie.css";

class Movie extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    getMovieDetails(id);
  };

  render() {
    const { details, loading } = this.props;

    if (loading && !details) return <CircularProgress className="loader" />;

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
            <p>{details.vote_average} / 10</p>
            {/* {details.genres.map(genre => (
                <p>{genre.name}</p>
              ))} */}
          </div>
          <div className="title-buttons">
            <h1>{details.title}</h1>
            <Fab color="primary" className="action-button">
              <Add />
            </Fab>
            <Fab color="primary" className="action-button">
              <Favorite />
            </Fab>
            <Fab color="primary" className="action-button">
              <Check />
            </Fab>
          </div>
          <p>{details.overview}</p>
        </div>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
            alt={details.title}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return {
    details: api.details,
    loading: api.loading
  };
};

export default connect(mapStateToProps)(Movie);
