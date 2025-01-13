import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slice/apiSlice';
import cartSlice from './slice/cartSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});