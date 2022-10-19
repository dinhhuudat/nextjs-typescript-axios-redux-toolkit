import { configureStore } from "@reduxjs/toolkit";
import deskDetails from "./deck";
const store = configureStore({
  reducer: {
    deskDetails: deskDetails,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
