import { LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import Cookies from "js-cookie";
import history from "../history";
import { getUserInfo } from "../userInteractions";
import { storeUserInfo } from "./userActions";

export const createUser = user => dispatch => {
  axios
    .post("http://localhost:5000/api/register", user)
    .then(({ data }) => {
      Cookies.set("token", data.token);
      // TODO Display notification logged in
      dispatch(storeUserInfo(data.user, data.token));
    })
    .then(() => history.push("/"))
    .catch(error => console.log(error.response.data));
};

export const checkUser = user => dispatch => {
  axios
    .post("http://localhost:5000/api/login", user)
    .then(({ data }) => {
      Cookies.set("token", data.token);
      // TODO Display notification logged in
      dispatch(storeUserInfo(data.user, data.token));
    })
    .then(() => history.push("/"))
    .catch(error => console.log(error.response.data));
};

export const tokenLogIn = tokenObj => dispatch => {
  axios
    .post("http://localhost:5000/api/token", tokenObj)
    .then(({ data }) => {
      dispatch(storeUserInfo(data.user, data.token));
    })
    .catch(error => console.log(error.response.data));
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
