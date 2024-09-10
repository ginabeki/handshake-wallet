import { configureStore } from "@reduxjs/toolkit";
import web5Reducer from "./web5Slice";

export const store = configureStore({
  reducer: {
    auth: web5Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
