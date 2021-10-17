import {
  ADD_CART,
  GET_CARTS,
  DELETE_CART,
  CLEAR_ADD_CART,
  CLEAR_DELETE_CART,
} from '../types'

const initialState = {
  addCartLoading: false,
  addCartSuccess: null,
  addCartFail: null,

  getCartsLoading: false,
  getCartsSuccess: null,
  getCartsFail: null,

  deleteCartLoading: false,
  deleteCartSuccess: null,
  deleteCartFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case ADD_CART:
      return {
        ...state,
        addCartLoading: payload.loading,
        addCartSuccess: payload.data,
        addCartFail: payload.error,
      }
    case CLEAR_ADD_CART:
      return {
        ...state,
        addCartLoading: false,
        addCartSuccess: null,
        addCartFail: null,
      }
    case GET_CARTS:
      return {
        ...state,
        getCartsLoading: payload.loading,
        getCartsSuccess: payload.data,
        getCartsFail: payload.error,
      }
    case DELETE_CART:
      return {
        ...state,
        deleteCartLoading: payload.loading,
        deleteCartSuccess: payload.data,
        deleteCartFail: payload.error,
      }
    case CLEAR_DELETE_CART:
      return {
        ...state,
        deleteCartLoading: false,
        deleteCartSuccess: null,
        deleteCartFail: null,
      }
    default:
      return state
  }
}
