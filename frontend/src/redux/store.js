/**
 * Redux Store Configuration
 */

import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/postSlice";
import { commentReducer } from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,
});

export const getState = store.getState;
export const dispatch = store.dispatch;
