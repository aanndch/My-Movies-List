import axios from "axios";
import { storeUserInfo, storeSearchedUserInfo } from "./actions/userActions";
import { SET_LOADING, SET_DONE } from "./actions/types";
import Store from "./store";
import { Success, Error } from "./components/Notification";
import { API_URL } from "./config";

const toggleSelection = (id, info) => {
  axios
    .post(`${API_URL}/api/users/lists/${id}`, info)
    .then(({ data }) => {
      getUserInfo(data._id, data.token);
      Success(data.operation);
    })
    .catch(error => Error(error.response.data));
};

const getUserInfo = (id, token) => {
  axios
    .get(`${API_URL}/api/users/${id}`)
    .then(({ data }) => {
      Store.dispatch(storeUserInfo(data, token));
    })
    .catch(error => Error(error.response.data));
};

const getSearchedUserInfo = username => {
  Store.dispatch({ type: SET_LOADING });
  axios
    .get(`${API_URL}/api/users/search/${username}`)
    .then(({ data }) => {
      Store.dispatch(storeSearchedUserInfo(data[0]));
      Store.dispatch({ type: SET_DONE });
    })
    .catch(error => {
      Error(error.response.data);
      Store.dispatch({ type: SET_DONE });
    });
};

const updateProfile = details => {
  axios
    .post(`${API_URL}/api/users/update/${details.id}`, details)
    .then(({ data }) => {
      Store.dispatch(storeSearchedUserInfo(data));
      Success("Updated!");
    })
    .catch(error => Error(error.response.data));
};

export { toggleSelection, getUserInfo, getSearchedUserInfo, updateProfile };
