import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slice/apiSlice';
import  cartSlice from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});