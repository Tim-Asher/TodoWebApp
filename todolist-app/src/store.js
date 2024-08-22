import { configureStore } from "@reduxjs/toolkit";
import { todoApiSlice } from "./slices/todoApiSlice";
import { userApiSlice } from "./slices/userApiSlice";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todoApiSlice.middleware)
      .concat(userApiSlice.middleware),
  devTools: true,
});
export default store;
