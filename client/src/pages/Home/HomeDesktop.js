import React from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Input,
  Fade
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import MovieCard from "../../components/MovieCard";

import "./HomeDesktop.css";

const HomeDesktop = props => {
  const {
    category,
    value,
    now_playing,
    popular,
    top_rated,
    search,
    loadSearch,
    openSearch,
    isLoading,
    handleChange,
    handleSearchChange,
    searchMovie,
    closeSearch,
    loadMovie
  } = props;

  if (isLoading)
    return (
      <div id="loader">
        <CircularProgress />;
      </div>
    );

  let movies = [];
  let heading = "";
  if (category === "now_playing") {
    heading = "In Theaters";
    movies = now_playing;
  } else if (category === "popular") {
    heading = "Most Popular";
    movies = popular;
  } else {
    heading = "Top Rated";
    movies = top_rated;
  }

  if (loadSearch) {
    heading = "Search Results";
    movies = search;
  }

  return (
    <div className="home-container">
      <div className="heading search-part">
        {openSearch ? (
          <Fade in={openSearch}>
            <form method="GET" onSubmit={searchMovie}>
              <Search className="search-icon" />
              <Input
                className="search-input"
                disableUnderline={true}
                placeholder="Search for a movie"
                value={value}
                onChange={handleSearchChange}
              />
              <input
                type="submit"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px"
                }}
                tabIndex="-1"
              />
              <p onClick={closeSearch}>+</p>
            </form>
          </Fade>
        ) : (
          <>
            <h1 className="home-heading">{heading}</h1>
            <FormControl>
              <Select value={category} onChange={handleChange} name="category">
                <MenuItem value="now_playing">In theaters</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="top_rated">Top Rated</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </div>
      <div className="movie-cards">
        {movies.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", margin: "0.8rem" }}
          >
            <MovieCard
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
              onClick={() => loadMovie(movie.id)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeDesktop;
