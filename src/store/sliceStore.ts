import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import citySlice from "./features/city/citySlice";
import apiSlice from './features/city/cityApiSlice'

const rootReducer = combineReducers({
  user: userSlice,
  city: citySlice,
});

const store = configureStore({
  reducer:{ rootReducer,
  [apiSlice.reducerPath]:apiSlice.reducer},
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});
export default store;
export type AppDispach = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
