// Import necessary functions from Redux Toolkit and RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a new API slice for user-related operations using RTK Query
export const userApiSlice = createApi({
  // A unique key for the reducer in the Redux store
  reducerPath: "users",
  // Configuration for the base query, including the base URL for API requests
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  // Tag types used for caching and invalidation
  tagTypes: ["User"],
  // Define the endpoints for the API slice
  endpoints: (builder) => ({
    // Endpoint for user login
    loginUser: builder.mutation({
      // HTTP POST request configuration with user credentials
      query: (data) => ({
        url: "/users/login",
        method: "post",
        body: data, // The user login credentials
        credentials: "include", // Include cookies with the request
      }),
    }),
    // Endpoint for user logout
    logoutUser: builder.mutation({
      // HTTP POST request configuration for logging out
      query: () => ({
        url: "/users/logout",
        method: "post",
        credentials: "include", // Include cookies with the request
      }),
    }),
    // Endpoint for user registration
    registerUser: builder.mutation({
      // HTTP POST request configuration with user registration data
      query: (data) => ({
        url: "/users/register",
        method: "post",
        body: data, // The user registration data
      }),
    }),
    // Endpoint for checking the validity of a user's token
    checkToken: builder.query({
      // HTTP POST request configuration to validate the user's token
      query: () => ({
        url: "/users/validateToken",
        method: "post",
        credentials: "include", // Include cookies with the request
      }),
    }),
  }),
});

// Export hooks for the defined endpoints
export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useCheckTokenQuery,
} = userApiSlice;
