import { LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import Cookies from "js-cookie";

export const checkUser = user => dispatch => {
  axios.post("http://localhost:5000/api/user/login", user).then(({ data }) => {
    console.log(data);
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
