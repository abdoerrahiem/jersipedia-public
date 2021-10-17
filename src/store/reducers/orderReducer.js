import {UPDATE_ORDER, CLEAN_UPDATE_ORDER} from '../types'

const initialState = {
  updateOrderLoading: false,
  updateOrderSuccess: null,
  updateOrderFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case UPDATE_ORDER:
      return {
        ...state,
        updateOrderLoading: payload.loading,
        updateOrderSuccess: payload.data,
        updateOrderFail: payload.error,
      }
    case CLEAN_UPDATE_ORDER:
      return {
        ...state,
        updateOrderLoading: false,
        updateOrderSuccess: null,
        updateOrderFail: null,
      }
    default:
      return state
  }
}
