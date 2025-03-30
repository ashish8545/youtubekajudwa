import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        cachedResult: (state, action) => {
            Object.assign(state, action.payload)

            // LRU - Least Recently Used
            const keys = Object.keys(state);

            if (Object.keys(state) > 10) {
                keys.slice(0, 5).forEach(key => delete state[key]);
            }
        }
    }
})

export const { cachedResult } = searchSlice.actions;
export default searchSlice.reducer;