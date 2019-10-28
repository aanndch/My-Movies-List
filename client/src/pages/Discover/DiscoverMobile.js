import React from "react";
import {
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Button,
  Drawer
} from "@material-ui/core";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

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
    toggleDrawer,
    getMore,
    hasMore
  } = props;

  return (
    <div className="discover-container discover-mobile">
      <div className="discover-movies">
        <div className="discover-movies-heading">
          <h1>Discover</h1>
          <Button
            color="primary"
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
          <InfiniteScroll
            pageStart={0}
            loadMore={getMore}
            hasMore={hasMore}
            loader={<h4 key={0}>Loading...</h4>}
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
              <h1>NO RESULTS</h1>
            )}
          </InfiniteScroll>
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
