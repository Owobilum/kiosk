import { doc, getDoc, getDocs, collection, addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import swal from 'sweetalert2'

import { db } from "../../utils/firebase"
import { ORDER_LOADING_END, ORDER_LOADING_START } from "./actionTypes";

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
        date: new Date(),
        paymentReference: reference
    }
    try {
        await addDoc(collection(db, `users/${id}/orders`), data)
        cb()
        console.log('ORDER SAVED')
    } catch (error) {
        console.error(error)
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonColor: '#D48166',
        })
    } finally {
        dispatch(orderLoadingEnd())
    }

}

export const getOrders = (id) => async dispatch => {
    dispatch(orderLoadingStart())
    try {
        const querySnapshot = await getDocs(collection(db, `users/${id}/orders`));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(orderLoadingEnd())
    }
}