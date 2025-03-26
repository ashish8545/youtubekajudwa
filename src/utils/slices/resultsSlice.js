import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: "results",
    initialState: {
    },
    reducers: {
        cachedResults: (state, action) => {
            Object.assign(state, action.payload)
        }
    }
})

export const { cachedResults } = resultSlice.actions;
export default resultSlice.reducer;