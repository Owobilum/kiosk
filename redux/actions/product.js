import callApi from "../../utils/callApi"
import { ADD_SAVED_ITEM, CLEAR_PRODUCTS_IN_CATEGORY, GET_PRODUCT, GET_PRODUCTS_IN_CATEGORY, REMOVE_SAVED_ITEM } from "./actionTypes"


export const getProductsInCategory = (url, cb) => async dispatch => {
    try {
        const res = await callApi(url)
        const { data } = res
        dispatch({
            type: GET_PRODUCTS_IN_CATEGORY,
            payload: data
        })
    } catch (error) {
        console.error('***THE ERROR IS... ', error)
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
        console.error('***THE ERROR IS... ', error)
    } finally {
        cb()
    }
}

export const addSavedItem = item => ({
    type: ADD_SAVED_ITEM,
    payload: item
})

export const removeSavedItem = id => ({
    type: REMOVE_SAVED_ITEM,
    payload: id
})
