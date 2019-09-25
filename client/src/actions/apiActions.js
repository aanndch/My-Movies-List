import { SET_MOVIES, SET_MOVIE_DETAILS, SET_LOADING } from "./types";

const setMovies = movies => dispatch => {
  dispatch({ type: SET_LOADING });
  dispatch({
    type: SET_MOVIES,
    movies
  });
};

const setMovieDetails = details => dispatch => {
  dispatch({ type: SET_LOADING });
  dispatch({
    type: SET_MOVIE_DETAILS,
    details
  });
};

export { setMovies, setMovieDetails };
