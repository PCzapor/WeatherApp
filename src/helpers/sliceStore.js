import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import citySlice from "./citySlice";

const rootReducer = combineReducers({
  user: userSlice,
  city: citySlice,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
