import {
  ORDER_LOADING_END,
  ORDER_LOADING_START,
  SAVE_ORDER,
  GET_ORDERS,
  SET_ORDER_DETAILS,
  SET_ORDER,
} from '../actions/actionTypes';

const InitialState = {
  orders: [],
  isLoading: false,
  order: {},
  orderDetails: {},
};

// eslint-disable-next-line default-param-last
const orderReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDER_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_LOADING_END:
      return {
        ...state,
        isLoading: false,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
