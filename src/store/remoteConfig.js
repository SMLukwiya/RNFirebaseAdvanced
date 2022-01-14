import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    values: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateConfigs: (state, {payload}) => {
            state.values = payload;
        }
    }
});

const { reducer, actions } = userSlice;
export const { updateConfigs } = actions;

export default reducer;