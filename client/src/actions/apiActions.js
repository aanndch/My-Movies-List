import { SET_NOW_PLAYING } from "./types";

const setNowPlaying = results => {
  return {
    type: SET_NOW_PLAYING,
    nowPlaying: results
  };
};

export { setNowPlaying };
