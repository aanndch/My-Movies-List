import { combineReducers } from "redux";
import apiReducers from "../reducers/apiReducers";
import userReducers from "./userReducers";
import searchedUserReducers from "./searchedUserReducers";
import loadingReducers from "./loadingReducers";

const rootReducer = combineReducers({
  user: userReducers,
  searchedUser: searchedUserReducers,
  api: apiReducers,
  loading: loadingReducers
});

export default rootReducer;
