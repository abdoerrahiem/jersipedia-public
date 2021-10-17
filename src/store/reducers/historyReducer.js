import {GET_HISTORIES, UPDATE_STATUS} from '../types'

const initialState = {
  getHistoriesLoading: false,
  getHistoriesSuccess: null,
  getHistoriesFail: null,

  updateStatusLoading: false,
  updateStatusSuccess: null,
  updateStatusFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_HISTORIES:
      return {
        ...state,
        getHistoriesLoading: payload.loading,
        getHistoriesSuccess: payload.data,
        getHistoriesFail: payload.error,
      }
    case UPDATE_STATUS:
      return {
        ...state,
        updateStatusLoading: payload.loading,
        updateStatusSuccess: payload.data,
        updateStatusFail: payload.error,
      }
    default:
      return state
  }
}
