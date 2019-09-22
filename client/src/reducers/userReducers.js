import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  email: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        email: action.email
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        email: ""
      };
    }
    default:
      return state;
  }
};

export default userReducer;
