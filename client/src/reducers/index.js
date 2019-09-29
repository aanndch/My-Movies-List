import { combineReducers } from "redux";
import apiReducers from "../reducers/apiReducers";
import userReducers from "./userReducers";
import searchedUserReducers from "./searchedUserReducers";

const rootReducer = combineReducers({
  user: userReducers,
  searchedUser: searchedUserReducers,
  api: apiReducers
});

export default rootReducer;
