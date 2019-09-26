import axios from "axios";
import { storeUserInfo } from "./actions/userActions";
import Store from "./store";

const toggleSelection = (id, info) => {
  axios
    .post(`http://localhost:5000/api/user/lists/${id}`, info)
    .then(({ data }) => {
      console.log("Success!");
      getUserInfo(data._id, data.token);
    })
    .catch(error => console.log(error.response.data));
};

const getUserInfo = (id, token) => {
  axios
    .get(`http://localhost:5000/api/user/${id}`)
    .then(({ data }) => {
      Store.dispatch(storeUserInfo(data, token));
    })
    .catch(error => console.log(error.response.data));
};

export { toggleSelection, getUserInfo };
