import { createSlice } from "@reduxjs/toolkit";

const videosByCategoryIdSlice = createSlice({
    name: 'videos_by_category_id',
    initialState: {},
    reducers: {
        cachedVideosByCategoryId: (state, action) => {
            Object.assign(state, action.payload)

            // LRU - Least Recently Used
            const keys = Object.keys(state);

            if (Object.keys(state) > 10) {
                keys.slice(0, 5).forEach(key => delete state[key]);
            }
        }
    }
})

export const { cachedVideosByCategoryId } = videosByCategoryIdSlice.actions;
export default videosByCategoryIdSlice.reducer;