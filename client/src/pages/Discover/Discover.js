import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { setFilters } from "../../actions/userActions";
import { getMoviesByGenres } from "../../apiCalls";
import { genresDB } from "../../data/movieGenres";

import MovieCard from "../../components/MovieCard";

import "./Discover.css";

class Discover extends Component {
  componentDidMount() {
    const { genres } = this.props;
    getMoviesByGenres(genres.join(","));
  }

  handleGenreSelect = e => {
    let { genres, dispatch } = this.props;

    const selectedGenre = parseInt(e.target.value);

    if (genres.includes(selectedGenre)) {
      genres = genres.filter(genre => genre !== selectedGenre);
    } else {
      genres = [...genres, parseInt(selectedGenre)];
    }

    dispatch(setFilters(genres));

    // this.setState({
    //   genres
    // });

    // this.setState(prevState => ({
    //   genres: [...prevState.genres, parseInt(e.target.value)]
    // }));
  };

  getMovies = () => {
    let { genres } = this.props;
    getMoviesByGenres(genres.join(","));
  };

  render() {
    const { genres, isLoading } = this.props;
    const { filteredMovies } = this.props;

    return (
      <div className="discover-container">
        <div className="discover-movies">
          <h1>Discover</h1>
          {isLoading ? (
            <CircularProgress className="loader" />
          ) : (
            <div className="filtered-movies">
              {filteredMovies &&
                filteredMovies.map(movie => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    style={{ textDecoration: "none", margin: "0.8rem" }}
                  >
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      poster={movie.poster_path}
                      rating={movie.vote_average}
                    />
                  </Link>
                ))}
            </div>
          )}
        </div>
        <div className="select-genres">
          <h1>Filter :</h1>
          <div className="genre-checkboxes">
            {genresDB.map(genre => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    color="primary"
                    checked={genres.includes(genre.id)}
                    onChange={this.handleGenreSelect}
                    value={genre.id}
                    className="genre-checkbox"
                  />
                }
                label={genre.name}
                className="checkbox-label"
              />
            ))}
          </div>
          <Button
            className="filter-button"
            color="primary"
            size="large"
            variant="contained"
            onClick={this.getMovies}
          >
            FILTER
          </Button>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   setFilters: filters => dispatch(setFilters(filters))
// });

const mapStatetoProps = ({ api, user, loading }) => ({
  filteredMovies: api.filteredMovies,
  genres: user.filters,
  isLoading: loading.isLoading
});

export default connect(
  mapStatetoProps
  // mapDispatchToProps
)(Discover);
