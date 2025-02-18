import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import searchReducer from "./slices/searchSlice";
import videoCategoriesReducer from "./slices/videoCategoriesSlice";
import videosByCategoryIdReducer from "./slices/videosByCategoryIdSlice";
import userReducer from "./slices/userSlice";

const appStore = configureStore({
    reducer: {
        app: appReducer,
        search: searchReducer,
        video_category: videoCategoriesReducer,
        video_by_category_id: videosByCategoryIdReducer,
        user: userReducer
    }
});

export default appStore;