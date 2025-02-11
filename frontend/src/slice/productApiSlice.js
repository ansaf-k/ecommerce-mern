import { apiSlice } from './apiSlice'

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ pageNumber, keyword }) => ({
        url: '/api/products',
        params: { pageNumber, keyword },
      }),
      providesTags: ['Products'],
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
      providesTags: ["Product"]
    }),
    createProduct: build.mutation({
      query: () => ({
        url: `/api/products`,
        method: "POST"
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    uploadProductImage: build.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    productReviews: build.mutation({
      query: (data) => ({
        url: '/api/products/review',
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Product', 'Products'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useProductReviewsMutation
} = productApi