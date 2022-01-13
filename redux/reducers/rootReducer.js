import { combineReducers } from "redux"
import { productReducer } from "./productReducer"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { cartReducer } from "./cartReducer"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'products',
        'cart'
    ]
}

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer