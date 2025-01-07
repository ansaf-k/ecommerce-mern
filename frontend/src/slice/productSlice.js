import { apiSlice } from './apiSlice'

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query({
      query: () => ({
        url: '/api/products',
      }),
    }),
  }),
})

export const { useGetProductQuery } = productApi