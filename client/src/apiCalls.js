import axios from "axios";

import { API_KEY } from "./config/config";
import {
  setMovies,
  setMovieDetails,
  setMovieSearch
} from "./actions/apiActions";
import store from "./store";

const URL = "https://api.themoviedb.org/3";

const getMovies = category => {
  axios
    .get(`${URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`)
    .then(({ data: { results } }) => {
      const movies = {
        [category]: results
      };
      store.dispatch(setMovies(movies));
    });
};

const getMovieDetails = id => {
  axios
    .get(`${URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => {
      store.dispatch(setMovieDetails(data));
    });
};

const searchForMovie = query => {
  axios
    .get(
      `${URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
    )
    .then(({ data: { results } }) => {
      store.dispatch(setMovieSearch({ search: results }));
    })
    .catch(error => console.log(error.response.data));
};

export { getMovies, getMovieDetails, searchForMovie };
