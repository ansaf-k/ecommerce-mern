import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

const addDecimal = (num) => {
    return num.toFixed(2);
}

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

            // calculate the items price
            state.itemsPrice = addDecimal(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );

            // calculate the shipping price,if items price is greate than 100, shipping price is free else shipping prise is 100
            state.shippinPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

            //calculate the tax price
            state.taxPrice = addDecimal(0.15 * state.itemsPrice);

            // CALCULATE THE TOTAL
            state.totalPrice =
                Number(state.itemsPrice) +
                Number(state.shippinPrice) +
                Number(state.taxPrice);

            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeItemFromCart: (state, action) => {
            
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            // calculate the items price
            state.itemsPrice = addDecimal(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
            // calculate the shipping price,if items price is greate than 100, shipping price is free else shipping prise is 100
            state.shippinPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

            //calculate the tax price
            state.taxPrice = addDecimal(0.15 * state.itemsPrice);

            // CALCULATE THE TOTAL
            state.totalPrice =
                Number(state.itemsPrice) +
                Number(state.shippinPrice) +
                Number(state.taxPrice);


            if (state.cartItems.length === 0) {
                localStorage.clear();
            } else {
                localStorage.setItem('cart', JSON.stringify(state));
            }


        }
    },
})

export const { addToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;