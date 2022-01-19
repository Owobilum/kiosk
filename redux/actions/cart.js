import { ADD_TO_CART, DECREASE_PRODUCT_QUANTITY, EMPTY_CART, REMOVE_FROM_CART } from "./actionTypes"
import { notifyUser } from "../../utils/helpers"

export const addToCart = product => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: product
    })
    notifyUser(`${product.title} added to cart`)
}

export const removeFromCart = productId => ({
    type: REMOVE_FROM_CART,
    payload: productId
})

export const decreaseProductQuantity = productId => ({
    type: DECREASE_PRODUCT_QUANTITY,
    payload: productId
})

export const emptyCart = () => ({ type: EMPTY_CART })

