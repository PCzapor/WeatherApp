import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { loggedUser: null, isLoading:false },
  reducers: {
    login: (state, action) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      state.loggedUser = null;
    },
    startLoading:(state,action)=>{
        state.isLoading=action.payload;
    },
    stopLoading:(state,action)=>{
        state.isLoading=action.payload;
    }
  },
});
export const { login, logout,startLoading,stopLoading } = userSlice.actions;
export const selectLoggedUser = (state) => state.user.loggedUser || {};
export const isLoading=(state)=>state.user.isLoading;
export default userSlice.reducer;
