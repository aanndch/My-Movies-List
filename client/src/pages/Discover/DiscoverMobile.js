import React from "react";
import {
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Button,
  Drawer
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { genresDB } from "../../data/movieGenres";

import MovieCard from "../../components/MovieCard";

import "./DiscoverMobile.css";

const DiscoverMobile = props => {
  const {
    genres,
    isLoading,
    filteredMovies,
    handleGenreSelect,
    getMovies,
    open,
    toggleDrawer
  } = props;

  return (
    <div className="discover-container discover-mobile">
      <div className="discover-movies">
        <div className="discover-movies-heading">
          <h1>Discover</h1>
          <Button
            type="primary"
            variant="contained"
            onClick={toggleDrawer}
            style={{ backgroundColor: "#31db91", width: "125px" }}
          >
            Filter
          </Button>
        </div>
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
      <Drawer anchor="right" open={open}>
        <div className="select-genres select-genres-mobile">
          <div className="genre-checkboxes genre-checkboxes-mobile">
            {genresDB.map(genre => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    color="primary"
                    checked={genres.includes(genre.id)}
                    onChange={handleGenreSelect}
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
            onClick={getMovies}
          >
            FILTER
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default DiscoverMobile;
