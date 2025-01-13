import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: { address: "", city: "", postalCode: "", country: "" }, paymentMethod: "" };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find((x) => x._id == item._id);

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => {
                    return x._id === existingItem._id ? item : x;
                });
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeItemFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        resetCart: (state) => (state = initialState),

        saveAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart",JSON.stringify(state));
        },
        paymentHandler: (state,action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart",JSON.stringify(state));
        }
    },
})

export const { addToCart, removeItemFromCart, resetCart, saveAddress, paymentHandler } = cartSlice.actions;

export default cartSlice.reducer;