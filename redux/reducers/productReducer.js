import { GET_PRODUCTS_IN_CATEGORY, CLEAR_PRODUCTS_IN_CATEGORY, GET_PRODUCT, SAVE_PRODUCTS } from "../actions/actionTypes"

const initialState = {
    products: [],
    categoryProducts: [],
    product: {},
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_IN_CATEGORY:
            return {
                ...state,
                categoryProducts: action.payload
            }
        case CLEAR_PRODUCTS_IN_CATEGORY:
            return {
                ...state,
                categoryProducts: []
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case SAVE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}