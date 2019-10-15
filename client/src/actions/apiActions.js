import {
  SET_MOVIES,
  SET_MOVIE_DETAILS,
  SET_MOVIE_SEARCH,
  SET_FILTERED_MOVIES
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

export { setMovies, setMovieDetails, setMovieSearch, setFilteredMovies };
