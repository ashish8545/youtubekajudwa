import { createSlice } from "@reduxjs/toolkit";

const videosByCategoryIdSlice = createSlice({
    name: 'videos_by_category_id',
    initialState: {},
    reducers: {
        cachedVideosByCategoryId: (state, action) => {
            Object.assign(state, action.payload)
        }
    }
})

export const { cachedVideosByCategoryId } = videosByCategoryIdSlice.actions;
export default videosByCategoryIdSlice.reducer;