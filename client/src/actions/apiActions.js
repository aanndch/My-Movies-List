import { SET_MOVIES, SET_MOVIE_DETAILS } from "./types";

const setMovies = movies => {
  return {
    type: SET_MOVIES,
    movies
  };
};

const setMovieDetails = details => {
  return {
    type: SET_MOVIE_DETAILS,
    details
  };
};

export { setMovies, setMovieDetails };
