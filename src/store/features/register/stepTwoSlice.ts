import { createSlice } from "@reduxjs/toolkit";

type stepTwoType = {
    city: string;
};
const initialState: stepTwoType = {
    city: "",
};

const stepTwoSlice = createSlice({
    name: "stepTwo",
    initialState,
    reducers: {
        stepTwoSubmit: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
    },
});
export const { stepTwoSubmit } = stepTwoSlice.actions;
export default stepTwoSlice.reducer;
