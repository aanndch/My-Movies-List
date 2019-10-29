import { SET_LOADING, SET_DONE } from "../actions/types";

const loadingReducers = (
  state = { isLoading: false, editProfile: false },
  action
) => {
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
    default:
      return state;
  }
};

export default loadingReducers;
