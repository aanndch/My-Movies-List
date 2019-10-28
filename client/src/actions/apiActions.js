import {
  SET_MOVIES,
  SET_MOVIE_DETAILS,
  SET_MOVIE_SEARCH,
  SET_FILTERED_MOVIES,
  ADD_FILTERED_MOVIES
} from "./types";

const setMovies = movies => dispatch => {
  dispatch({
    type: SET_MOVIES,
    movies
  });
};

const setMovieDetails = details => dispatch => {
  dispatch({
    type: SET_MOVIE_DETAILS,
    details
  });
};

const setMovieSearch = movies => dispatch => {
  dispatch({
    type: SET_MOVIE_SEARCH,
    movies
  });
};

const setFilteredMovies = movies => dispatch => {
  dispatch({
    type: SET_FILTERED_MOVIES,
    movies
  });
};

const addFilteredMovies = (movies, hasMore) => dispatch => {
  dispatch({
    type: ADD_FILTERED_MOVIES,
    movies,
    hasMore
  });
};

export {
  setMovies,
  setMovieDetails,
  setMovieSearch,
  setFilteredMovies,
  addFilteredMovies
};
