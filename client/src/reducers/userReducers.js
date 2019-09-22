import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: action.user
      };
    }
    default:
      return state;
  }
};

export default userReducer;
