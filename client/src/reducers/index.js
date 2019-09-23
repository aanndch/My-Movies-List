import { combineReducers } from "redux";
import apiReducers from "../reducers/apiReducers";
import registrationReducers from "./registrationReducers";

const rootReducer = combineReducers({
  user: registrationReducers,
  api: apiReducers
});

export default rootReducer;
