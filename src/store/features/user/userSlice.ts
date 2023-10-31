import { createSlice } from "@reduxjs/toolkit";
// import { LogIn, LogOut } from "components/localStorage/Storage";
import toast from "react-hot-toast";
import { StorageKeys } from "types";

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
            // const login = action.payload.login;
            // LogIn(login);
            toast.success("Zalogowano");
        },
        logout: (state) => {
            localStorage.removeItem(StorageKeys.User);
            state.loggedUser = null;
        },
    },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
