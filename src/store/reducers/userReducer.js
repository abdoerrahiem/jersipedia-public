import {
  GET_USER,
  LOGOUT_USER,
  RESET_UPDATE_PASSWORD_USER,
  RESET_UPDATE_USER,
  UPDATE_PASSWORD_USER,
  UPDATE_USER,
} from '../types'

const initialState = {
  user: null,

  updateUserLoading: false,
  updateUserSuccess: null,
  updateUserFail: null,

  updatePasswordLoading: false,
  updatePasswordSuccess: null,
  updatePasswordFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload.data,
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: payload.data,
      }
    case UPDATE_USER:
      return {
        ...state,
        updateUserLoading: payload.loading,
        updateUserSuccess: payload.data,
        updateUserFail: payload.error,
      }
    case RESET_UPDATE_USER:
      return {
        ...state,
        updateUserLoading: false,
        updateUserSuccess: null,
        updateUserFail: null,
      }
    case UPDATE_PASSWORD_USER:
      return {
        ...state,
        updatePasswordLoading: payload.loading,
        updatePasswordSuccess: payload.data,
        updatePasswordFail: payload.error,
      }
    case RESET_UPDATE_PASSWORD_USER:
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordSuccess: null,
        updatePasswordFail: null,
      }
    default:
      return state
  }
}
