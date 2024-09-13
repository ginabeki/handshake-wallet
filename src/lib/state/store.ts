import { configureStore } from "@reduxjs/toolkit";
import web5Reducer from "./web5Slice";
import userProfileReducer from "./userProfileSlice";
import createListingReducer from "./marketplaceSlice";

export const store = configureStore({
  reducer: {
    auth: web5Reducer,
    userProfile: userProfileReducer,
    marketplace: createListingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/initializeweb5/fulfilled'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;