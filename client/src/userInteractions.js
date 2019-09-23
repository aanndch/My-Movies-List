import axios from "axios";

const toggleSelection = (id, info) => {
  axios
    .post(`http://localhost:5000/api/user/lists/${id}`, info)
    .then(() => console.log("Success!"))
    .catch(error => console.log(error.response.data));
};

const getUserInfo = id => {
  // TODO create action that saves user data in store
  axios
    .get(`http://localhost:5000/api/user/${id}`)
    .then(data => console.log(data));
};

export { toggleSelection, getUserInfo };
