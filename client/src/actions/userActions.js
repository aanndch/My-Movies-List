import { LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import Cookies from "js-cookie";

export const createUser = user => dispatch => {
  axios
    .post("http://localhost:5000/api/user/register", user)
    .then(({ data }) => {
      if (data.error) {
        console.log(data.error);
      } else {
        Cookies.set("token", data.token);
        // TODO Display notification logged in
        dispatch(loginUser(user));
      }
    });
};

export const checkUser = user => dispatch => {
  axios.post("http://localhost:5000/api/user/login", user).then(({ data }) => {
    if (data.error) {
      console.log(data.error);
    } else {
      Cookies.set("token", data.token);
      // TODO Display notification logged in
      dispatch(loginUser(user));
    }
  });
};

export const loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  };
};
