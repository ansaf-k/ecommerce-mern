import { apiSlice } from './apiSlice'

const orderApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createOrders: build.mutation({
            query: (data) => ({
                url: '/api/orders',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Orders'],
        }),
        getOrdersById: build.query({
            query: (id) => ({
                url: `/api/orders/${id}`,
            }),
            providesTags: ['Orders'],
        }),
        getMyOrders: build.query({
            query: () => ({
                url: `/api/orders/mine`,
            }),
            providesTags: ['Orders'],
        }),
        getOrders: build.query({
            query: () => ({
                url: `/api/orders`,
            }),
            providesTags: ['Orders'],
        }),
        isDelivered: build.mutation({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: "PUT",
                body:id
            }),
            invalidatesTags: ['Orders'],
        }),
        orderToPaid: build.mutation({
            query: (id) => ({
                url: `/api/orders/${id}/pay`,
                method: "PUT",
            }),
            invalidatesTags: ['Orders'],
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