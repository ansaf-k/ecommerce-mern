import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (data) => ({
                url: "/api/users",
                method: "POST",
                body: data,
            }),
        }),
        login: build.mutation({
            query: (data) => ({
                url: "/api/users/auth",
                method: "POST",
                body: data,
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: "/api/users/logout",
                method: "POST",
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginMutation, useLogoutMutation } = userApiSlice;