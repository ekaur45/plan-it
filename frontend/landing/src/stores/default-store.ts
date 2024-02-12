import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/global-reducer";

const defaultStore = configureStore({
    reducer:{
        globalReducer:globalReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof defaultStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof defaultStore.dispatch

export default defaultStore;