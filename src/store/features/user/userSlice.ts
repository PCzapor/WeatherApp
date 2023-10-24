import { createSlice } from "@reduxjs/toolkit";

interface User{
  loggedUser:string[]|null;
}


const initialState:User ={
  loggedUser:null,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedUser = action.payload;
   
    },
    logout: (state) => {
      state.loggedUser = null;
    },
  
  
  },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
