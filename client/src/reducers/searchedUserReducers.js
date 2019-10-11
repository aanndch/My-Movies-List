import { STORE_SEARCHED_USER_INFO } from "../actions/types";

const searchedUserReducers = (state = { editProfile: true }, action) => {
  switch (action.type) {
    case STORE_SEARCHED_USER_INFO: {
      return {
        ...state,
        ...action.user,
        editProfile: !state.editProfile
      };
    }
    default:
      return state;
  }
};

export default searchedUserReducers;
