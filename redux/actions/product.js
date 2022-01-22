import { doc, updateDoc } from "firebase/firestore";

import callApi from "../../utils/callApi"
import {
    ADD_SAVED_ITEM, CLEAR_PRODUCTS_IN_CATEGORY, GET_PRODUCT,
    GET_PRODUCTS_IN_CATEGORY, REMOVE_SAVED_ITEM, SAVE_PRODUCTS
} from "./actionTypes"
import { handleError, notifyUser } from '../../utils/helpers'
import { db } from '../../utils/firebase'
import { getUser } from "./auth";


export const getProductsInCategory = (url, cb) => async dispatch => {
    try {
        const res = await callApi(url)
        const { data } = res
        dispatch({
            type: GET_PRODUCTS_IN_CATEGORY,
            payload: data
        })
    } catch (error) {
        handleError(error)
    } finally {
        cb()
    }
}

export const clearProductsInCategory = () => ({ type: CLEAR_PRODUCTS_IN_CATEGORY })

export const getProduct = (productId, cb) => async dispatch => {
    try {
        const res = await callApi(`/${productId}`)
        const { data } = res
        dispatch({
            type: GET_PRODUCT,
            payload: data
        })
    } catch (error) {
        handleError(error)
    } finally {
        cb()
    }
}

export const saveProducts = products => ({
    type: SAVE_PRODUCTS,
    payload: products
})

export const addSavedItem = (item, prevItems, userId) => async dispatch => {
    let newItems
    try {
        if (!prevItems || prevItems.length === 0) {
            newItems = [item]
        } else
            if ((prevItems.findIndex(prevItem => prevItem.productId === item.productId)) === (-1)) {
                newItems = [...prevItems, item]
            } else {
                notifyUser(`${item.title} added to wishlist`)
                return
            }
        const itemsRef = doc(db, "users", userId);
        await updateDoc(itemsRef, {
            savedItems: newItems
        });
        await dispatch(getUser(userId, () => null))
        notifyUser(`${item.title} added to wishlist`)
    } catch (error) {
        handleError(error)
    }
}

export const removeSavedItem = (savedItems, itemId, userId, cb) => async dispatch => {
    let newItems
    try {
        newItems = savedItems.filter(item => item.productId !== itemId)
        const itemsRef = doc(db, "users", userId);
        await updateDoc(itemsRef, {
            savedItems: newItems
        });
        cb(true)
    } catch (error) {
        cb(false)
        handleError(error)
    }
}