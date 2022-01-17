import { combineReducers } from "redux"
import { productReducer } from "./productReducer"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { cartReducer } from "./cartReducer"
import { authReducer } from "./authReducer"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'products',
        'cart',
        'auth'
    ]
}

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer