import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";

const appStore = configureStore({
    reducer: {
        app: appReducer
    }
});

export default appStore;