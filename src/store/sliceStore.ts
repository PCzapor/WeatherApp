import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice, { login, logout } from "./features/user/userSlice";
import citySlice, {
    addFavorite,
    removeFavorite,
} from "./features/city/citySlice";
import registerSteps from "./features/register/registerSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { StorageKeys } from "types";
import { USERS_FIXED } from "components/localStorage/Storage";
import { getFavortiesKey } from "constants/localStore.constants";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: login,
    effect: (action) => {
        const existingUser = USERS_FIXED.find(
            (user) => user.login === action.payload.login
        );

        const loggedInUser = existingUser ? existingUser.login : "";

        localStorage.setItem(StorageKeys.User, JSON.stringify(loggedInUser));
    },
});
listenerMiddleware.startListening({
    actionCreator: addFavorite,
    effect: (action) => {
        const key = getFavortiesKey();
        const existingObject = localStorage.getItem(key);
        if (!existingObject) {
            return localStorage.setItem(key, JSON.stringify([action.payload]));
        }
        const newExistingObject: string[] = JSON.parse(existingObject);
        if (newExistingObject.includes(action.payload)) return;
        newExistingObject.push(action.payload);
        return localStorage.setItem(key, JSON.stringify(newExistingObject));
    },
});
listenerMiddleware.startListening({
    actionCreator: removeFavorite,
    effect: (action) => {
        const key = getFavortiesKey();
        const existingObject = localStorage.getItem(key);
        if (!existingObject) return;
        const newExistingObject: string[] = JSON.parse(existingObject);
        if (!newExistingObject.includes(action.payload)) return;
        const arr = newExistingObject.filter((e) => e !== action.payload);
        return localStorage.setItem(key, JSON.stringify(arr));
    },
});

const rootReducer = combineReducers({
    user: userSlice,
    city: citySlice,
    steps: registerSteps,
});

const store = configureStore({
    reducer: { rootReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
export default store;
export type AppDispach = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
