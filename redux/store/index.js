import { createStore, combineReducers } from "redux";

import authReducer from "../reducers/authReducer/authReducer";
const store = createStore(
  combineReducers({
    auth: authReducer,
  })
);

export default store;
