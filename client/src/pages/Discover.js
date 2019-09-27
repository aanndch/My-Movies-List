import React, { Component } from "react";
import { connect } from "react-redux";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { getMoviesByGenres } from "../apiCalls";
import { genresDB } from "../data/movieGenres";

import MovieCard from "../components/MovieCard";

import "./Discover.css";

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    const { genres } = this.state;
    getMoviesByGenres(genres.join(","));
  }

  handleGenreSelect = e => {
    let { genres } = this.state;

    const selectedGenre = parseInt(e.target.value);

    if (genres.includes(selectedGenre)) {
      genres = genres.filter(genre => genre !== selectedGenre);
    } else {
      genres = [...genres, parseInt(selectedGenre)];
    }

    this.setState({
      genres
    });
    // this.setState(prevState => ({
    //   genres: [...prevState.genres, parseInt(e.target.value)]
    // }));
  };

  getMovies = () => {
    let { genres } = this.state;
    getMoviesByGenres(genres.join(","));
  };

  render() {
    const { genres } = this.state;
    const { filteredMovies } = this.props;

    return (
      <div className="discover-container">
        <div className="discover-body">
          <div className="discover-movies">
            <h1>Discover</h1>
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
      </div>
    );
  }
}

const mapStatetoProps = ({ api }) => ({
  filteredMovies: api.filteredMovies
});

export default connect(mapStatetoProps)(Discover);
