import { createSlice } from "@reduxjs/toolkit";
import { LogIn, LogOut } from "components/localStorage/Storage";

interface User {
    loggedUser: string[] | null;
}

const initialState: User = {
    loggedUser: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedUser = action.payload;
            const login = action.payload.login;
            LogIn(login);
        },
        logout: (state) => {
            state.loggedUser = null;
            LogOut();
        },
    },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
