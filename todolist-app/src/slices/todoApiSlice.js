// Import necessary functions from Redux Toolkit and RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a new API slice using RTK Query
export const todoApiSlice = createApi({
  // A unique key for the reducer in the Redux store
  reducerPath: "todos",
  // Configuration for the base query, including the base URL for API requests
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  // Tag types used for caching and invalidation
  tagTypes: ["Task"],
  // Define the endpoints for the API slice
  endpoints: (builder) => ({
    // Endpoint for fetching all tasks
    getTasks: builder.query({
      // HTTP GET request configuration
      query: () => ({
        url: "/todos",
        credentials: "include", // Include cookies with the request
      }),
      // Tags for caching and invalidation
      providesTags: ["Task"],
    }),
    // Endpoint for fetching a single task by ID
    getTaskById: builder.query({
      // HTTP GET request configuration with ID parameter
      query: (id) => ({
        url: `/todos/${id}`,
      }),
    }),
    // Endpoint for adding a new task
    addTask: builder.mutation({
      // HTTP POST request configuration with task data
      query: (data) => ({
        url: `/todos`,
        method: "post",
        body: data, // The task data to be added
        credentials: "include", // Include cookies with the request
      }),
      // Tags for invalidating cached data
      invalidatesTags: ["Task"],
    }),
    // Endpoint for editing an existing task
    editTask: builder.mutation({
      // HTTP PATCH request configuration with task ID and data
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data, // The updated task data
        withCredentials: "include", // Include cookies with the request
      }),
      // Tags for invalidating cached data
      invalidatesTags: ["Task"],
    }),
    // Endpoint for deleting a task
    deleteTask: builder.mutation({
      // HTTP DELETE request configuration with task ID
      query: (id) => ({
        url: `/todos/${id}`,
        method: "delete",
      }),
      // Tags for invalidating cached data
      invalidatesTags: ["Task"],
    }),
  }),
});

// Export hooks for the defined endpoints
export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = todoApiSlice;
