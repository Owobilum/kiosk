import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import persistedReducer from "./reducers/rootReducer"
import { persistStore } from 'redux-persist'

const middleware = [thunk]

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))

export const persistor = persistStore(store)

const makeStore = () => store

export const wrapper = createWrapper(makeStore)

