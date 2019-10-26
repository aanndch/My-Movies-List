import { SET_LOADING, SET_DONE, EDIT_PROFILE, SAVE_PROFILE } from "../actions/types";

const loadingReducers = (state = { isloading: false, editProfile: false }, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case SET_DONE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case EDIT_PROFILE: {
      return {
        ...state,
        editProfile: true
      }
    };
    case SAVE_PROFILE: {
      return {
        ...state,
        editProfile: false
      }
    };
    default:
      return state;
  }
};

export default loadingReducers;
