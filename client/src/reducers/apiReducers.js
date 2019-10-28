import {
  SET_MOVIES,
  SET_MOVIE_DETAILS,
  SET_MOVIE_SEARCH,
  SET_FILTERED_MOVIES,
  ADD_FILTERED_MOVIES
} from "../actions/types";

const initialState = {
  movies: {
    now_playing: [],
    popular: [],
    top_rated: [],
    search: []
  },
  loadSearch: false,
  details: [],
  loading: false,
  filteredMovies: [],
  hasMore: true
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        movies: { ...state.movies, ...action.movies },
        loadSearch: false,
        loading: false
      };
    }
    case SET_MOVIE_DETAILS: {
      return {
        ...state,
        details: action.details,
        loadSearch: false,
        loading: false
      };
    }
    case SET_MOVIE_SEARCH: {
      return {
        ...state,
        movies: { ...state.movies, search: action.movies.search },
        loadSearch: true,
        loading: false
      };
    }
    case SET_FILTERED_MOVIES: {
      return {
        ...state,
        filteredMovies: action.movies,
        hasMore: true,
        loading: false
      };
    }
    case ADD_FILTERED_MOVIES: {
      return {
        ...state,
        filteredMovies: [...state.filteredMovies, ...action.movies],
        hasMore: action.hasMore,
        loading: false
      };
    }
    default:
      return state;
  }
};

export default apiReducer;
