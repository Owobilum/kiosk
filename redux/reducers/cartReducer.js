import {
  ADD_TO_CART,
  DECREASE_PRODUCT_QUANTITY,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from '../actions/actionTypes';

const initialState = {
  cart: [],
};

// eslint-disable-next-line default-param-last
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const productIndex = state.cart.findIndex(
        (product) => product.productId === action.payload.productId
      );
      if (productIndex === -1) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
      const biggerCart = state.cart.map((product) => {
        if (product.productId !== action.payload.productId) {
          return product;
        }
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      });
      return {
        ...state,
        cart: biggerCart,
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product.productId !== action.payload
        ),
      };
    case DECREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.productId !== action.payload) {
            return product;
          }
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }),
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
