import { ORDER_LOADING_END, ORDER_LOADING_START, SAVE_ORDER } from "../actions/actionTypes"

const InitialState = {
    orders: [],
    isLoading: false
}

const orderReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SAVE_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case ORDER_LOADING_START:
            return {
                ...state,
                isLoading: true
            }
        case ORDER_LOADING_END:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default orderReducer