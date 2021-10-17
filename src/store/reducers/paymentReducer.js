import {ADD_TRANSACTION, CLEAR_ADD_TRANSACTION} from '../types'

const initialState = {
  addTransactionLoading: false,
  addTransactionSuccess: null,
  addTransactionFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        addTransactionLoading: payload.loading,
        addTransactionSuccess: payload.data,
        addTransactionFail: payload.error,
      }
    case CLEAR_ADD_TRANSACTION:
      return {
        ...state,
        addTransactionLoading: false,
        addTransactionSuccess: null,
        addTransactionFail: null,
      }
    default:
      return state
  }
}
