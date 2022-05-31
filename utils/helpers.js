import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';

import { MODAL_BTN_COLOR } from './constants';

toast.configure();

export const notifyUser = (message) =>
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    hideProgressBar: true,
  });

export const formatMoney = (money) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(money);

export const handleError = (error) => {
  swal.fire({
    icon: 'error',
    title: 'Error',
    text: error?.message,
    confirmButtonColor: MODAL_BTN_COLOR,
  });
};

export const handleCartText = (numberInCart) => {
  if (numberInCart > 1) {
    return 'items';
  }
  if (numberInCart === 0) {
    return 'Empty';
  }
  return 'item';
};
