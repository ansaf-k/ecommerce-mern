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
        isDelivered: build.mutation({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: "PATCH",
            }),
        }),
        orderToPaid: build.mutation({
            query: (id) => ({
                url: `/api/orders/${id}/pay`,
                method: "PUT",
            }),
        }),
    }),
})

export const {
    useCreateOrdersMutation,
    useGetOrdersByIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useIsDeliveredMutation,
    useOrderToPaidMutation
} = orderApi;