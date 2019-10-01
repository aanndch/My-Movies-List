import axios from "axios";
import { storeUserInfo, storeSearchedUserInfo } from "./actions/userActions";
import Store from "./store";

const toggleSelection = (id, info) => {
  axios
    .post(`http://localhost:5000/api/users/lists/${id}`, info)
    .then(({ data }) => {
      console.log("Success!");
      getUserInfo(data._id, data.token);
    })
    .catch(error => console.log(error.response.data));
};

const getUserInfo = (id, token) => {
  axios
    .get(`http://localhost:5000/api/users/${id}`)
    .then(({ data }) => {
      Store.dispatch(storeUserInfo(data, token));
    })
    .catch(error => console.log(error.response.data));
};

const getSearchedUserInfo = username => {
  axios
    .get(`http://localhost:5000/api/users/search/${username}`)
    .then(({ data }) => {
      Store.dispatch(storeSearchedUserInfo(data[0]));
    })
    .catch(error => console.log(error.response.data));
};

const updateProfile = details => {
  axios
    .post(`http://localhost:5000/api/users/update/${details.id}`, details)
    .then(({ data }) => {
      console.log(data);
      Store.dispatch(storeSearchedUserInfo(data));
    })
    .catch(error => console.log(error.response.data));
};

export { toggleSelection, getUserInfo, getSearchedUserInfo, updateProfile };
