import { createSlice } from "@reduxjs/toolkit";

type StepOneType = {
    username: string;
    password: string;
    confirmPassword: string;
};

const initialState: StepOneType = {
    username: "",
    password: "",
    confirmPassword: "",
};

const stepOneSlice = createSlice({
    name: "stepOne",
    initialState,
    reducers: {
        stepOneSubmit: (state, action) => {
            console.log(action.payload);
            const data = action.payload;
            return data;
        },
    },
});
export const { stepOneSubmit } = stepOneSlice.actions;
export default stepOneSlice.reducer;
