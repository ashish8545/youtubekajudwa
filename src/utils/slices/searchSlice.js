import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        cachedResult: (state, action) => {
            Object.assign(state, action.payload)
        }
    }
})

export const { cachedResult } = searchSlice.actions;
export default searchSlice.reducer;