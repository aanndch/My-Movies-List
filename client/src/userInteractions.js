import axios from "axios";

const toggleFavorite = (id, info) => {
  axios
    .post(`http://localhost:5000/api/user/lists/${id}`, info)
    .then(() => console.log("Success!"))
    .catch(error => console.log(error.response.data));
};

export { toggleFavorite };
