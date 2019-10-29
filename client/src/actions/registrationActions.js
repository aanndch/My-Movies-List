import { LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import Cookies from "js-cookie";
import history from "../history";
import { storeUserInfo } from "./userActions";
import { Success, Error } from "../components/Notification";

export const createUser = user => dispatch => {
  axios
    .post("https://lit-forest-80154.herokuapp.com/api/register", user)
    .then(({ data }) => {
      Cookies.set("token", data.token);
      dispatch(storeUserInfo(data.user, data.token));
      Success("Registered!");
    })
    .then(() => history.push("/"))
    .catch(error => Error(error.response.data));
};

export const checkUser = user => dispatch => {
  axios
    .post("https://lit-forest-80154.herokuapp.com/api/login", user)
    .then(({ data }) => {
      Cookies.set("token", data.token);
      dispatch(storeUserInfo(data.user, data.token));
      Success("Logged In!");
    })
    .then(() => history.push("/"))
    .catch(error => Error(error.response.data));
};

export const tokenLogIn = tokenObj => dispatch => {
  axios
    .post("https://lit-forest-80154.herokuapp.com/api/token", tokenObj)
    .then(({ data }) => {
      dispatch(storeUserInfo(data.user, data.token));
    })
    .catch(error => Error(error.response.data));
};

export const loginUser = (user, token) => {
  return {
    type: LOGIN_USER,
    _id: user._id,
    email: user.email,
    username: user.username,
    token
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER
});
