import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
    name:'city',
    initialState:{active:null, favorites:[]},
    reducers:{
        addFavorite:(state, action)=>{
            const cityName = action.payload
            if(!state.favorites.includes(cityName)){
                    state.favorites.push(cityName)
            }
        },
        removeFavorite:(state,action)=>{
            const cityName=action.payload;
            if(state.favorites.includes(cityName)){
               state.favorites= state.favorites.filter((e)=>e!==cityName)
            }
        },
        setActive:(state,action)=>{
            state.active = action.payload

        }
    }
})
export const {addFavorite,removeFavorite,setActive}= citySlice.actions;
export const selectActiveCity= (state)=> state.city.active;
export const selectFavorites = (state)=> state.city.favorites;
export default citySlice.reducer 