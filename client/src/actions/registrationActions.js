import { LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import Cookies from "js-cookie";
import history from "../history";

export const createUser = user => dispatch => {
  axios
    .post("http://localhost:5000/api/register", user)
    .then(({ data }) => {
      Cookies.set("token", data.token);
      // TODO Display notification logged in
      dispatch(loginUser(user));
    })
    .then(() => history.push("/"))
    .catch(error => console.log(error.response.data));
};

export const checkUser = user => dispatch => {
  axios
    .post("http://localhost:5000/api/login", user)
    .then(({ data }) => {
      if (data.error) {
        console.log(data.error);
      } else {
        Cookies.set("token", data.token);
        // TODO Display notification logged in
        dispatch(loginUser(user));
      }
    })
    .then(() => history.push("/"))
    .catch(error => console.log(error.response.data));
};

export const loginUser = user => {
  return {
    type: LOGIN_USER,
    email: user.email
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER
});
