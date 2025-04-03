import { createSlice } from "@reduxjs/toolkit";

const RecommendedVideosSlice = createSlice({
    name: "recommendedvideos",
    initialState: {},
    reducers: {
        cachedRecommendedVideos: (state, action) => {
            Object.assign(state, action.payload)  
        }
    }
})

export const { cachedRecommendedVideos } = RecommendedVideosSlice.actions;
export default RecommendedVideosSlice.reducer;