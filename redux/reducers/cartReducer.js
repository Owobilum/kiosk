import { ADD_TO_CART, DECREASE_PRODUCT_QUANTITY, INCREASE_PRODUCT_QUANTITY, REMOVE_FROM_CART } from "../actions/actionTypes"


const initialState = {
    cart: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let biggerCart
            let productIndex = state.cart.findIndex(product => product.productId === action.payload.productId)
            if (productIndex === -1) {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }
            } else {
                biggerCart = state.cart.map(product => {
                    if (product.productId !== action.payload.productId) {
                        return product
                    } else {
                        return {
                            ...product,
                            quantity: product.quantity + 1
                        }
                    }
                })
                return {
                    ...state,
                    cart: biggerCart
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(product => product.productId !== action.payload)
            }
        case DECREASE_PRODUCT_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product.productId !== action.payload) {
                        return product
                    } else {
                        return {
                            ...product,
                            quantity: product.quantity - 1
                        }
                    }
                })
            }
        default:
            return state
    }
}