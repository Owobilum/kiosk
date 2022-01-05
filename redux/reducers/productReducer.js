import { GET_PRODUCTS_IN_CATEGORY, GET_PRODUCTS, CLEAR_PRODUCTS_IN_CATEGORY } from "../actions/actionTypes"

const initialState = {
    products: [],
    categoryProducts: [],
    product: {},
    loading: false
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
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
        default:
            return state
    }
}