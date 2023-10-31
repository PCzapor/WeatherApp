import { createSlice } from "@reduxjs/toolkit";
import { StorageKeys } from "types";
// import {
//     GetFavorites,
//     RemoveFavorites,
//     SetFavorites,
// } from "components/localStorage/Storage";

interface City {
    active: string | null;
    favorites: string[];
}

function GetFavorites(): string[] {
    const user = localStorage.getItem(StorageKeys.User);
    const existingFavorites = localStorage.getItem(
        `${StorageKeys.Favorites}_${user}`
    );
    if (!existingFavorites) return [];
    console.log("existingFavorites", existingFavorites);
    return JSON.parse(existingFavorites);
}
const data = GetFavorites();
const initialState: City = {
    favorites: data,

    active: null,
};

const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const cityName = action.payload;
            if (!state.favorites.includes(cityName)) {
                state.favorites.push(cityName);
                // SetFavorites(cityName);
            }
        },
        removeFavorite: (state, action) => {
            const cityName = action.payload;
            state.favorites = state.favorites.filter((city) => {
                return city !== cityName;
            });
            // RemoveFavorites(cityName);
        },
        setActive: (state, action) => {
            if (!state.active) state.active = state.favorites[0];
            state.active = action.payload;
        },
    },
});
export const { addFavorite, removeFavorite, setActive } = citySlice.actions;
export default citySlice.reducer;
