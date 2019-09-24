import { SET_MOVIES, SET_MOVIE_DETAILS } from "../actions/types";

const initialState = {
  movies: {
    now_playing: [],
    popular: [],
    top_rated: []
  },
  details: []
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        movies: { ...state.movies, ...action.movies }
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
