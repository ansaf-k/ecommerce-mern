import { apiSlice } from './apiSlice'

const orderApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createOrders: build.mutation({
            query: (data) => ({
                url: '/api/orders',
                method: "POST",
                body: data
            }),
        }),
        getOrdersById: build.query({
            query: (id) => ({
                url: `/api/orders/${id}`,
            }),
        }),
        getMyOrders: build.query({
            query: () => ({
                url: `/api/orders/mine`,
            }),
        }),
        getOrders: build.query({
            query: () => ({
                url: `/api/orders`,
            }),
        }),
    }),
})

export const { useCreateOrdersMutation, useGetOrdersByIdQuery, useGetMyOrdersQuery,useGetOrdersQuery } = orderApi