import { SET_NOW_PLAYING, SET_MOVIE_DETAILS } from "./types";

const setNowPlaying = results => {
  return {
    type: SET_NOW_PLAYING,
    nowPlaying: results
  };
};

const setMovieDetails = details => {
  return {
    type: SET_MOVIE_DETAILS,
    details
  };
};

export { setNowPlaying, setMovieDetails };
