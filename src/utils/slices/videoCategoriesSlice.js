import { createSlice } from "@reduxjs/toolkit";

const videoCategoriesSlice = createSlice({
    name: 'video_category',
    initialState: {

    },
    reducers: {
        cachedVideoCategories: (state, action) => {
            Object.assign(state, action.payload)
        }
    }
})

export const { cachedVideoCategories } = videoCategoriesSlice.actions
export default videoCategoriesSlice.reducer