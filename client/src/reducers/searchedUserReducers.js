import { STORE_SEARCHED_USER_INFO, EDIT_PROFILE } from "../actions/types";

const searchedUserReducers = (state = { editProfile: false }, action) => {
  switch (action.type) {
    case STORE_SEARCHED_USER_INFO: {
      return {
        ...state,
        ...action.user,
        editProfile: false
      };
    }
    case EDIT_PROFILE: {
      return {
        ...state,
        editProfile: true
      };
    }
    default:
      return state;
  }
};

export default searchedUserReducers;
