import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  email: "",
  password: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        email: action.user.email,
        password: action.user.password
      };
    }
    default:
      return state;
  }
};

export default userReducer;
