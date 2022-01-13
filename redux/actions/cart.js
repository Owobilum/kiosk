import { ADD_TO_CART, DECREASE_PRODUCT_QUANTITY, REMOVE_FROM_CART } from "./actionTypes"

export const addToCart = product => ({
    type: ADD_TO_CART,
    payload: product
})

export const removeFromCart = productId => ({
    type: REMOVE_FROM_CART,
    payload: productId
})

export const decreaseProductQuantity = productId => ({
    type: DECREASE_PRODUCT_QUANTITY,
    payload: productId
})

