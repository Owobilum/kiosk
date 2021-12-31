import { combineReducers } from "redux"
import { productReducer } from "./productReducer"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'products'
    ]
}

const rootReducer = combineReducers({
    products: productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer