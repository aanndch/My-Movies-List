import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieDetails } from "../apiCalls";
import { CircularProgress } from "@material-ui/core";

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
      <>
        <div className="movie-page-container">
          <img
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.title}
            className="background-image"
          />
          <div className="movie-info">
            <div className="extra">
              <p>{details.vote_average}</p>|
              {/* {details.genres.map(genre => (
                <p>{genre.name}</p>
              ))} */}
            </div>
            <h1>{details.title}</h1>
          </div>
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
              alt={details.title}
            />
          </div>
        </div>
      </>
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
