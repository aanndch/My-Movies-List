import axios from "axios";

import { API_KEY } from "./config/config";
import {
  setMovies,
  setMovieDetails,
  setMovieSearch,
  setFilteredMovies
} from "./actions/apiActions";
import Store from "./store";
import { SET_LOADING, SET_DONE } from "./actions/types";

const URL = "https://api.themoviedb.org/3";

const getMovies = category => {
  Store.dispatch({ type: SET_LOADING });
  axios
    .get(`${URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`)
    .then(({ data: { results } }) => {
      const movies = {
        [category]: results
      };
      Store.dispatch(setMovies(movies));
      Store.dispatch({ type: SET_DONE });
    })
    .catch(error => console.log(error.response.data));
};

const getMovieDetails = id => {
  Store.dispatch({ type: SET_LOADING });
  axios
    .get(`${URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => {
      Store.dispatch(setMovieDetails(data));
      Store.dispatch({ type: SET_DONE });
    })
    .catch(error => console.log(error.response.data));
};

const searchForMovie = query => {
  Store.dispatch({ type: SET_LOADING });
  axios
    .get(
      `${URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
    )
    .then(({ data: { results } }) => {
      Store.dispatch(setMovieSearch({ search: results }));
      Store.dispatch({ type: SET_DONE });
    })
    .catch(error => console.log(error.response.data));
};

const getMoviesByGenres = genres => {
  Store.dispatch({ type: SET_LOADING });
  axios
    .get(
      `${URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres}&sort_by=vote_average.desc&vote_count.gte=1000`
    )
    .then(({ data: { results } }) => {
      Store.dispatch(setFilteredMovies(results));
      Store.dispatch({ type: SET_DONE });
    })
    .catch(error => console.log(error.response.data));
};

export { getMovies, getMovieDetails, searchForMovie, getMoviesByGenres };
