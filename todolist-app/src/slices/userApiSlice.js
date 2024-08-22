import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "post",
        credentials: "include",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "post",
        body: data,
      }),
    }),
    checkToken: builder.query({
      query: () => ({
        url: "/users/validateToken",
        method: "post",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useCheckTokenQuery,
} = userApiSlice;
