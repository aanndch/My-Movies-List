import { LOGIN_USER, LOGOUT_USER, STORE_USER_INFO } from "../actions/types";

const initialState = {
  email: ""
};

const userReducers = (state = initialState, action) => {
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
    case STORE_USER_INFO: {
      return {
        ...state,
        ...action.user
      };
    }
    default:
      return state;
  }
};

export default userReducers;
