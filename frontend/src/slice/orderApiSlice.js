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
    }),
})

export const { useCreateOrdersMutation, useGetOrdersByIdQuery } = orderApi