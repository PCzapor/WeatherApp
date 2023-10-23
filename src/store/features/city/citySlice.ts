import { createSlice } from "@reduxjs/toolkit";

interface City {
    active:string|null;
    favorites:string[];
}

const initialState:City = {
    favorites:[],
        active:  null,
     }

const citySlice = createSlice({
    name:'city',
    initialState,
    reducers:{
        addFavorite:(state, action)=>{
            const cityName = action.payload
            if(!state.favorites.includes(cityName)){
                    state.favorites.push(cityName)
            }
        },
        removeFavorite:(state,action)=>{
            const cityName=action.payload;
           state.favorites = state.favorites.filter((city)=>{
           return city!==cityName
           }
            )
        },
        setActive:(state,action)=>{
            if(!state.active) state.active=state.favorites[0]
            state.active = action.payload

        }
    }
})
export const { addFavorite, removeFavorite, setActive }= citySlice.actions;
export default citySlice.reducer