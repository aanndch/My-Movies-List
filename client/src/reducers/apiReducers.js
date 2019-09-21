import { SET_NOW_PLAYING, SET_MOVIE_DETAILS } from "../actions/types";

const initialState = {
  nowPlaying: [],
  details: []
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOW_PLAYING: {
      return {
        ...state,
        nowPlaying: action.nowPlaying
      };
    }
    case SET_MOVIE_DETAILS: {
      return {
        ...state,
        details: action.details
      };
    }
    default:
      return state;
  }
};

export default apiReducer;
