import { combineReducers } from "redux";
import apiReducers from "../reducers/apiReducers";
import userReducers from "./userReducers";

const rootReducer = combineReducers({
  user: userReducers,
  api: apiReducers
});

export default rootReducer;
