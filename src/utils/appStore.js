import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import searchReducer from "./slices/searchSlice";
import videoCategoriesReducer from "./slices/videoCategoriesSlice";
import videosByCategoryIdReducer from "./slices/videosByCategoryIdSlice";
import userReducer from "./slices/userSlice";
import subscriptionsReducer from "./slices/subscriptionsSlice";
import tokenReducer from "./slices/tokenSlice";
import resultsReducer from "./slices/resultsSlice";

const appStore = configureStore({
    reducer: {
        app: appReducer,
        search: searchReducer,
        video_category: videoCategoriesReducer,
        video_by_category_id: videosByCategoryIdReducer,
        user: userReducer,
        subscriptions: subscriptionsReducer,
        token: tokenReducer,
        results: resultsReducer,
    }
});

export default appStore;