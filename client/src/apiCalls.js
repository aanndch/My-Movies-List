import axios from "axios";

import { API_KEY } from "./config/config";
import { setNowPlaying } from "./actions/apiActions";
import store from "./store";

const URL = "https://api.themoviedb.org/3";

const getNowPlaying = () => {
  axios
    .get(`${URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    .then(({ data: { results } }) => {
      store.dispatch(setNowPlaying(results));
    });
};

export { getNowPlaying };
