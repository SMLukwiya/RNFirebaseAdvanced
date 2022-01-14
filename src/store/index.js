import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import cart from './cart';
import order from './order';
import remoteConfigs from './remoteConfig';

const rootReducer = combineReducers({
    user,
    remoteConfigs,
    cart,
    order
});

export default rootReducer;