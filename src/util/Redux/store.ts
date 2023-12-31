import { configureStore } from "@reduxjs/toolkit";
import ManagementSlice from "./management";
import PriceManagement from "./pricemanagement";
import dataReducer from './dataSlice'
import userSlice from "./userSlice";
import apiSlice from "./apiSlice";

export const store = configureStore({
    reducer: {
        management: ManagementSlice,
        PriceManagement: PriceManagement,
        data: dataReducer,
        profile: userSlice,
        api: apiSlice,
    },
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch