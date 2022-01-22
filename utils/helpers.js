import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2'

import { MODAL_BTN_COLOR } from './constants'

toast.configure()

export const notifyUser = (message) => {
    return toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true
    });
}

export const formatMoney = (money) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(money);
};

export const handleError = (error) => {
    console.error(error)
    swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message,
        confirmButtonColor: MODAL_BTN_COLOR,
    })
}