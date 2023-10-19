import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{loggedUser:null},
    reducers:{
        login:(state,action)=>{state.loggedUser=action.payload},
    logout:(state)=>{state.loggedUser=null}
    }
})
export const {login, logout} =userSlice.actions;
export const selectLoggedUser = (state)=> state.user.loggedUser;
export default userSlice.reducer;