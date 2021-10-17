import {
  DELETE_PARAMETER_JERSEY,
  GET_JERSEYS,
  GET_JERSEYS_BY_LEAGUE,
  SAVE_KEYWORD_JERSEY,
} from '../types'

const initialState = {
  getJerseysLoading: false,
  getJerseysSuccess: null,
  getJerseysFail: null,

  id: null,
  name: null,
  keyword: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_JERSEYS:
      return {
        ...state,
        getJerseysLoading: payload.loading,
        getJerseysSuccess: payload.data,
        getJerseysFail: payload.error,
      }
    case GET_JERSEYS_BY_LEAGUE:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        keyword: null,
      }
    case DELETE_PARAMETER_JERSEY:
      return {
        ...state,
        id: null,
        name: null,
        keyword: null,
      }
    case SAVE_KEYWORD_JERSEY:
      return {
        ...state,
        keyword: payload.data,
        id: null,
        name: null,
      }
    default:
      return state
  }
}
