import { getDocs, collection, addDoc,doc,getDoc } from "firebase/firestore";
import swal from 'sweetalert2'

import { db } from "../../utils/firebase"
import { GET_ORDERS, ORDER_LOADING_END, ORDER_LOADING_START, SET_ORDER, SET_ORDER_DETAILS } from "./actionTypes";
import { MODAL_BTN_COLOR } from "../../utils/constants";
import { handleError } from '../../utils/helpers';


export const orderLoadingStart = () => ({
    type: ORDER_LOADING_START
})

export const orderLoadingEnd = () => ({
    type: ORDER_LOADING_END
})

export const saveOrder = (id, items, reference, cb) => async dispatch => {
    dispatch(orderLoadingStart())
    let data = {
        items,
        status: "Pending",
        date: new Date().toDateString(),
        paymentReference: reference
    }
    try {
         const res = await addDoc(collection(db, `users/${id}/orders`), data)
        dispatch({
            type: SET_ORDER,
            payload:{
                id: res.id,
                path: res.path
            }
        })
        cb()
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: MODAL_BTN_COLOR
        })
    } finally {
        dispatch(orderLoadingEnd())
    }

}

export const getOrders = (id) => async dispatch => {
    dispatch(orderLoadingStart())
    try {
        const querySnapshot = await getDocs(collection(db, `users/${id}/orders`));
        let orders = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            orders.push({ id: doc.id, data: doc.data() })
        });
        dispatch({
            type: GET_ORDERS,
            payload: orders
        })
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: MODAL_BTN_COLOR
        })
    } finally {
        dispatch(orderLoadingEnd())
    }
}

export const getOrder = (path,id,cb) => async dispatch => {
    try {
        const docRef = doc(db, path);
        const docSnap = await getDoc(docRef);
        dispatch({
            type:SET_ORDER_DETAILS,
            payload: { ...docSnap.data(), id }
        })
    } catch (error) {
        handleError(error)
    } finally {
        cb()
    }

}