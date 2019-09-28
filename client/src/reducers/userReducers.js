import {
  LOGIN_USER,
  LOGOUT_USER,
  STORE_USER_INFO,
  SET_FILTERS,
  SET_OPEN_SEARCH
} from "../actions/types";

const initialState = {
  _id: "",
  username: "",
  email: "",
  token: "",
  filters: [],
  openSearch: false
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
        ...action.user,
        token: action.token
      };
    }
    case SET_FILTERS: {
      return {
        ...state,
        filters: action.filters
      };
    }
    case SET_OPEN_SEARCH: {
      return {
        ...state,
        openSearch: !state.openSearch
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
