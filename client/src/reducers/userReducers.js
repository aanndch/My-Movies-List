import { LOGIN_USER, LOGOUT_USER, STORE_USER_INFO } from "../actions/types";

const initialState = {
  _id: "",
  username: "",
  email: "",
  token: ""
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        _id: action._id,
        username: action.username,
        email: action.email,
        token: action.token
      };
    }
    case STORE_USER_INFO: {
      return {
        ...state,
        ...action.user
      };
    }
    case LOGOUT_USER: {
      return {
        _id: "",
        username: "",
        email: "",
        token: ""
      };
    }
    default:
      return state;
  }
};

export default userReducers;
