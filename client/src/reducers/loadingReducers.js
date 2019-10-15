import { SET_LOADING } from "../actions/types";

const loadingReducers = (state = { loading: false }, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        isLoading: !state.isLoading
      };
    }
    default:
      return state;
  }
};

export default loadingReducers;
