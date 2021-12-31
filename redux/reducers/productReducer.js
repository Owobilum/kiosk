import { GET_PRODUCTS } from "../actions/actionTypes"

const initialState = {
    products: [],
    loading: false
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}