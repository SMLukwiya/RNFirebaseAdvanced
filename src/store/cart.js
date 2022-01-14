import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: {},
    deliveryFee: 1000,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, {payload}) => {
            if (state.products[payload.id]) {
                state.products[payload.id].quantity += payload.quantity;
                state.totalPrice += payload.price;
            } else {
                state.products[payload.id] = payload;
                state.totalPrice += payload.price
            }
        },
        removeFromCart: (state, {payload}) => {
            state.totalPrice -= state.products[payload].price;
            delete state.products[payload]
        },
        addQuantity: (state, {payload}) => {
            state.products[payload.id].quantity += 1;
            state.products[payload.id].price += payload.unitPrice
            state.totalPrice += payload.unitPrice
        },
        reduceQuanity: (state, {payload}) => {
            if (state.products[payload.id].quantity < 2) return;
            state.products[payload.id].quantity -= 1;
            state.products[payload.id].price -= payload.unitPrice
            state.totalPrice -= payload.unitPrice
        },
        updateFromCart: (state, {payload}) => {

        },
        resetCart: (state, {payload}) => {
            state.products = {}
            state.totalPrice = 0
            state.deliveryFee = 0
        }
    }
})

const { actions, reducer } = cartSlice;
export const { addToCart, removeFromCart, addQuantity, reduceQuanity, updateFromCart, resetCart } = actions;

export default reducer;