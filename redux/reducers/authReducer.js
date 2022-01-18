

import { SET_AUTH_STATUS, SET_USER, SIGN_IN_WITH_GOOGLE, SET_AUTH_LOADING_START, SET_AUTH_LOADING_END, SET_CURRENT_PATH } from "../actions/actionTypes"

const initialState = {
    user: null,
    isLoading: false,
    currentPath: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_AUTH_LOADING_START:
            return {
                ...state,
                isLoading: true
            }
        case SET_AUTH_LOADING_END:
            return {
                ...state,
                isLoading: false
            }
        case SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.payload
            }
        default:
            return state
    }
}