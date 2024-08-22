import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApiSlice = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/todos",
        credentials: "include",
      }),
      providesTags: ["Task"],
    }),
    getTaskById: builder.query({
      query: (id) => ({
        url: `/todos/${id}`,
      }),
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/todos`,
        method: "post",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Task"],
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
        withCredentials: "include",
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = todoApiSlice;
