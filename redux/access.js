import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
  email: ""
}

export const accessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { update } = accessSlice.actions

export default accessSlice.reducer