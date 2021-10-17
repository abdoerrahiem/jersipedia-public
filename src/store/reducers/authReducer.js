import {CLEAR_AUTH_STATE, LOGIN_USER, REGISTER_USER} from '../types'

const initialState = {
  registerUserLoading: false,
  registerUserSuccess: null,
  registerUserFail: null,

  loginUserLoading: false,
  loginUserSuccess: null,
  loginUserFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        registerUserLoading: payload.loading,
        registerUserSuccess: payload.data,
        registerUserFail: payload.error,
      }
    case LOGIN_USER:
      return {
        ...state,
        loginUserLoading: payload.loading,
        loginUserSuccess: payload.data,
        loginUserFail: payload.error,
      }
    default:
      return state
  }
}
