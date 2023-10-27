import { createSlice } from "@reduxjs/toolkit";

type StepOneType = {
    username: string;
    password: string;
    confirmPassword: string;
    city: string;
    rodo: boolean;
    termsOfUse: boolean;
};

const initialState: StepOneType = {
    username: "",
    password: "",
    confirmPassword: "",
    city: "",
    rodo: false,
    termsOfUse: false,
};

const registerSteps = createSlice({
    name: "steps",
    initialState,
    reducers: {
        stepOneSubmit: (state, action) => {
            console.log(action.payload);
            const data = action.payload;
            return data;
        },
        stepTwoSubmit: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        stepThreeSubmit: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
    },
});
export const { stepOneSubmit, stepTwoSubmit, stepThreeSubmit } =
    registerSteps.actions;
export default registerSteps.reducer;
