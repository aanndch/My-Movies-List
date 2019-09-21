import { combineReducers } from "redux";
import apiReducer from "../reducers/apiReducers";

const rootReducer = combineReducers({
  api: apiReducer
});

export default rootReducer;
