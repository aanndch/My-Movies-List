import { SET_MOVIES, SET_MOVIE_DETAILS, SET_LOADING } from "../actions/types";

const initialState = {
  movies: {
    now_playing: [],
    popular: [],
    top_rated: []
  },
  details: [],
  loading: false
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case SET_MOVIES: {
      return {
        ...state,
        movies: { ...state.movies, ...action.movies },
        loading: false
      };
    }
    case SET_MOVIE_DETAILS: {
      return {
        ...state,
        details: action.details,
        loading: false
      };
    }
    default:
      return state;
  }
};

export default apiReducer;
