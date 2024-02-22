import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Redux/reducers/authReducer";

import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
const initialState = {};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  initialState,
  composedEnhancer,
});
export default store;
