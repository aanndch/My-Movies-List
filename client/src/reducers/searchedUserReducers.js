import { STORE_SEARCHED_USER_INFO } from "../actions/types";

const initialState = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  location: "",
  gender: "",
  favorites: [],
  watchlist: [],
  watched: []
};

const searchedUserReducers = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SEARCHED_USER_INFO: {
      return {
        ...state,
        ...action.user
      };
    }
    default:
      return state;
  }
};

export default searchedUserReducers;
