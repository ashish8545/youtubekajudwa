import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: "results",
    initialState: {
    },
    reducers: {
        cachedResults: (state, action) => {
            Object.assign(state, action.payload)

            // LRU - Least Recently Used
            const keys = Object.keys(state);

            if (Object.keys(state) > 10) {
                keys.slice(0, 5).forEach(key => delete state[key]);
            }
        }
    }
})

export const { cachedResults } = resultSlice.actions;
export default resultSlice.reducer;