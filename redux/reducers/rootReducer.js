import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import cartReducer from './cartReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'cart', 'auth'],
};

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
