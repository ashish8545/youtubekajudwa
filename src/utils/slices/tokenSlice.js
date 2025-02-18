import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: null,
    reducers: {
        token: (state, action) => {
            return action.payload
        },
        clearToken: (state, action) => {
            return null
        }
    }
})

export const { token, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;