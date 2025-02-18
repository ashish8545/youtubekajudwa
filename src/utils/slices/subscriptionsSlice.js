import { createSlice } from "@reduxjs/toolkit";

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState: null,
    reducers: {
        cachedSubscriptions: (state, action) => {
            return action.payload
        },
        clearSubscriptions: (state, action) => {
            return null
        }
    }
})

export const { cachedSubscriptions, clearSubscriptions } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;