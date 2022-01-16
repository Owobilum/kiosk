import { SET_AUTH_STATUS, SET_USER, SIGN_IN_WITH_GOOGLE } from './actionTypes'
import { signInWithGoogle, signOut } from "../../utils/firebase"
// import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development'


export const signInGoogle = () => async dispatch => {
    try {
        const res = await signInWithGoogle()
        if (res?.user) {
            dispatch({
                type: SET_USER,
                payload: res.user
            })
        }
    } catch (error) {
        console.error(error)
    }
}

export const setAuthStatus = (isAuthenticated) => ({
    type: SET_AUTH_STATUS,
    payload: isAuthenticated
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const signOutUser = () => () => {
    signOut()
}