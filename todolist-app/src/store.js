// Import the configureStore function from Redux Toolkit to set up the store
import { configureStore } from "@reduxjs/toolkit";
// Import the API slice for todos
import { todoApiSlice } from "./slices/todoApiSlice";
// Import the API slice for users
import { userApiSlice } from "./slices/userApiSlice";
// Import the reducer for authentication state management
import authSliceReducer from "./slices/authSlice";

// Configure the Redux store
const store = configureStore({
  // Define the reducers for the store
  reducer: {
    // Add the reducer for todo-related API operations
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    // Add the reducer for user-related API operations
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    // Add the reducer for authentication state
    auth: authSliceReducer,
  },
  // Configure the middleware for the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // Add the middleware for todo-related API operations
      .concat(todoApiSlice.middleware)
      // Add the middleware for user-related API operations
      .concat(userApiSlice.middleware),
  // Enable Redux DevTools extension for development
  devTools: true,
});

// Export the configured store to be used in the application
export default store;
