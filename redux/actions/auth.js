import { SET_AUTH_STATUS, SET_USER, SIGN_IN_WITH_GOOGLE, SET_AUTH_LOADING_START, SET_AUTH_LOADING_END, SET_CURRENT_PATH } from './actionTypes'
import { doc, getDoc, collection, addDoc, setDoc } from "firebase/firestore";
import {
    signInWithPopup, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, sendPasswordResetEmail
} from 'firebase/auth'
import swal from 'sweetalert2'

import { db, auth, googleProvider } from "../../utils/firebase"



export const setAuthStatus = (isAuthenticated) => ({
    type: SET_AUTH_STATUS,
    payload: isAuthenticated
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const signOutUser = () => () => {
    auth.signOut()
}

export const setAuthLoadingStart = () => ({
    type: SET_AUTH_LOADING_START,
})

export const setAuthLoadingEnd = () => ({
    type: SET_AUTH_LOADING_END,
})

export const setCurrentPath = (path) => ({
    type: SET_CURRENT_PATH,
    payload: path
})

export const setAddress = (address, id, cb) => async dispatch => {
    dispatch(setAuthLoadingStart())
    const docRef = doc(db, "users", id)
    try {
        await setDoc(doc(db, "users", id), { address }, { merge: true })
        const userSnap = await getDoc(docRef)
        dispatch(setUser({ ...userSnap.data(), id }))
        cb()
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setAuthLoadingEnd())
    }

}

export const storeUserToDb = (email, id, displayName, otherDetails) => async dispatch => {
    const docRef = doc(db, "users", id); //queryReference
    const docSnap = await getDoc(docRef); //qurerySnapshot
    let createdAt = new Date()
    console.log('DocRef before storage ', docRef)
    if (docSnap.exists()) {
        console.log("Document Data Exists:", docSnap.data());
        dispatch(setUser({ ...docSnap.data(), id }))
        return
    } else {
        let data
        // doc.data() will be undefined in this case
        otherDetails && displayName ? data = {
            displayName,
            email,
            createdAt,
            ...otherDetails
        } : (!displayName && otherDetails) ? data = {
            email,
            createdAt,
            ...otherDetails
        } : (displayName && !otherDetails) ? data = {
            email,
            displayName,
            createdAt
        } : data = {
            email,
            createdAt
        }
        try {
            // let data = {
            //     displayName,
            //     email,
            //     createdAt,
            //     ...otherDetails
            // }
            await setDoc(doc(db, "users", id), data)//setDoc needs an ID from us. addDoc get auto-generated ID 
            const userSnap = await getDoc(docRef)
            dispatch(setUser({ ...userSnap.data(), id }))
            console.log('DocSnap after storage', userSnap?.data())
        } catch (error) {
            console.error(error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.message,
                confirmButtonColor: '#D48166',
            })
        }
        // finally {
        //     console.log('ABUNDANCE')
        //     dispatch(setAuthLoadingEnd())
        // }
    }
}

export const signInWithGoogle = (cb) => async dispatch => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        if (res?.user) {
            const { displayName, email, uid } = res.user
            await dispatch(storeUserToDb(email, uid, displayName))
            cb()
            // dispatch({
            //     type: SET_USER,
            //     payload: res.user
            // })
        }
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: '#D48166',
        })
    } finally {
        dispatch(setAuthLoadingEnd())
    }
}

export const signUpWithEmail = (email, password, otherDetails, cb) => async dispatch => {
    dispatch(setAuthLoadingStart())
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (res?.user) {
            await dispatch(storeUserToDb(email, res.user.uid, null, otherDetails))
            cb()
        }
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: '#D48166',
        })
    } finally {
        dispatch(setAuthLoadingEnd())
    }

}

export const signInWithEmail = (email, password, cb) => async dispatch => {
    dispatch(setAuthLoadingStart())
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (res?.user) {
            await dispatch(storeUserToDb(email, res.user.uid))
            cb()
        }
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: '#D48166',
        })
    }
    finally {
        dispatch(setAuthLoadingEnd())
    }
}

export const resetPassword = email => async dispatch => {
    dispatch(setAuthLoadingStart())
    try {
        await sendPasswordResetEmail(auth, email)
        swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Password recovery email sent',
            confirmButtonColor: '#D48166',
        })
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: '#D48166',
        })
    } finally {
        dispatch(setAuthLoadingEnd())
    }
}