import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import searchReducer from "./slices/searchSlice";

const appStore = configureStore({
    reducer: {
        app: appReducer,
        search: searchReducer
    }
});

export default appStore;