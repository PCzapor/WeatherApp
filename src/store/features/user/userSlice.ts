import { createSlice } from "@reduxjs/toolkit";

interface User{
  loggedUser:string[]|null;
  isLoading:boolean;
}


const initialState:User ={
  loggedUser:null,
  isLoading:false,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedUser = action.payload;
      // state.isLoading=action.payload;
      //usemutatuon - opoznic response
    },
    logout: (state) => {
      state.loggedUser = null;
    },
  
  
  },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
