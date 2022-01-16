

import { SET_AUTH_STATUS, SET_USER, SIGN_IN_WITH_GOOGLE } from "../actions/actionTypes"

const initialState = {
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}