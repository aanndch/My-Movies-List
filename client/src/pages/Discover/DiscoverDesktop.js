import React from "react";
import {
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import { genresDB } from "../../data/movieGenres";

import MovieCard from "../../components/MovieCard";

import "./DiscoverDesktop.css";

const DiscoverDesktop = props => {
  const {
    genres,
    isLoading,
    filteredMovies,
    handleGenreSelect,
    getMovies,
    getMore,
    hasMore
  } = props;

  return (
    <div className="discover-container">
      <div className="discover-movies">
        <h1>Discover</h1>
        {isLoading ? (
          <div id="loader">
            <CircularProgress />;
          </div>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={getMore}
            hasMore={hasMore}
            loader={
              <h4 className="infinite-loader" key={0}>
                Loading...
              </h4>
            }
            className="filtered-movies"
          >
            {filteredMovies && filteredMovies.length > 0 ? (
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
              ))
            ) : (
              <h1>NO RESULTS!</h1>
            )}
          </InfiniteScroll>
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
    </div>
  );
};

export default DiscoverDesktop;
