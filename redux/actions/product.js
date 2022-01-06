import callApi from "../../utils/callApi"
import { CLEAR_PRODUCTS_IN_CATEGORY, GET_PRODUCTS_IN_CATEGORY } from "./actionTypes"


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