import { createStore, combineReducers } from "redux";

import authReducer from "../reducers/authReducer/authReducer";
import cleaningReducer from "../reducers/cleanerReducer/cleaningReducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    cleaning: cleaningReducer,
  })
);

export default store;
