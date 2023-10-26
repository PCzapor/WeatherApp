import { createSlice } from "@reduxjs/toolkit";

type StepThreeType = {
    rodo: boolean;
    termsOfUse: boolean;
};

const initialState: StepThreeType = {
    rodo: false,
    termsOfUse: false,
};

const stepThreeSlice = createSlice({
    name: "stepThree",
    initialState,
    reducers: {
        stepThreeSubmit: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
    },
});
export const { stepThreeSubmit } = stepThreeSlice.actions;
export default stepThreeSlice.reducer;
