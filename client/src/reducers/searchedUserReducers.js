import { STORE_SEARCHED_USER_INFO } from "../actions/types";

const searchedUserReducers = (state = {}, action) => {
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
