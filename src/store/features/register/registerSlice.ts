import { createSlice } from "@reduxjs/toolkit"

type StepOneType = {
  username: string
  password: string
  confirmPassword: string
  city: string
  rodo: boolean
  termsOfUse: boolean
}

const initialState: StepOneType = {
  username: "",
  password: "",
  confirmPassword: "",
  city: "",
  rodo: false,
  termsOfUse: false,
}

const registerSteps = createSlice({
  name: "steps",
  initialState,
  reducers: {
    stepOneSubmit: (state, action) => {
      Object.assign(state, action.payload)
    },
    stepTwoSubmit: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
})
export const { stepOneSubmit, stepTwoSubmit } = registerSteps.actions
export default registerSteps.reducer
