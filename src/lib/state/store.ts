import { configureStore } from "@reduxjs/toolkit";
import web5Reducer from "./web5Slice";
import userProfileReducer from "./userProfileSlice";
import pfisReducer from "./pfisSlice";

export const store = configureStore({
  reducer: {
    auth: web5Reducer,
    userProfile: userProfileReducer,
    pfis: pfisReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/initializeweb5/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
