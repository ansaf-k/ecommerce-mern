import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/users',
            }),
            providesTags:["Users"]
        }),
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
            }),
        }),
        updateUserProfile: build.mutation({
            query: (data) => ({
                url: "/api/users/profile",
                method: "PUT",
                body: data,
            }),
        }),
        getUserById: build.query({
            query: (id) => ({
                url: `/api/users/${id}`
            }),
            providesTags:["Users"]
        }),
        updateUser: build.mutation({
            query: (data) => ({
                url: `/api/users/edit`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags:["Users"]
        }),
    })
})

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateUserProfileMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation
} = userApiSlice;