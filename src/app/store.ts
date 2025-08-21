import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import shoppingReducer from "../features/shoppingLists/shoppingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping: shoppingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
