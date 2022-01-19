import swal from 'sweetalert2'

import callApi from "../../utils/callApi"
import {
    ADD_SAVED_ITEM, CLEAR_PRODUCTS_IN_CATEGORY, GET_PRODUCT,
    GET_PRODUCTS_IN_CATEGORY, REMOVE_SAVED_ITEM, SAVE_PRODUCTS
} from "./actionTypes"
import { MODAL_BTN_COLOR } from "../../utils/constants"


export const getProductsInCategory = (url, cb) => async dispatch => {
    try {
        const res = await callApi(url)
        const { data } = res
        dispatch({
            type: GET_PRODUCTS_IN_CATEGORY,
            payload: data
        })
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: MODAL_BTN_COLOR,
        })
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
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: MODAL_BTN_COLOR,
        })
    } finally {
        cb()
    }
}

export const saveProducts = products => ({
    type: SAVE_PRODUCTS,
    payload: products
})

export const addSavedItem = item => ({
    type: ADD_SAVED_ITEM,
    payload: item
})

export const removeSavedItem = id => ({
    type: REMOVE_SAVED_ITEM,
    payload: id
})
