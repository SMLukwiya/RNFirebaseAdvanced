import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    paymentOptions: [],
    chefs: [],
    deliveryAddress: {},
    notifications: [],
    promoCodes: [],
    loading: false
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setDeliveryAddress: (state, {payload}) => {
            deliveryAddress = payload;
        }
    }
});

const { actions, reducer } = orderSlice;

export const { setDeliveryAddress } = actions;

export default reducer;