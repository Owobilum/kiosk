import { GET_PRODUCTS_IN_CATEGORY, GET_PRODUCTS, CLEAR_PRODUCTS_IN_CATEGORY, GET_PRODUCT, ADD_SAVED_ITEM, REMOVE_SAVED_ITEM, SAVE_PRODUCTS } from "../actions/actionTypes"

const initialState = {
    products: [],
    categoryProducts: [],
    product: {},
    savedItems: []
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
        case ADD_SAVED_ITEM:
            if (!state.savedItems) {
                return {
                    ...state,
                    savedItems: [action.payload]
                }
            } else if ((state.savedItems.findIndex(item => item.productId === action.payload.productId)) === -1) {
                return {
                    ...state,
                    savedItems: [...state.savedItems, action.payload]
                }
            } else {
                return state
            }
        case REMOVE_SAVED_ITEM:
            return {
                ...state,
                savedItems: state.savedItems.filter(item => item.productId !== action.payload)
            }
        default:
            return state
    }
}