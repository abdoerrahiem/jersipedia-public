import {GET_CITIES, GET_CITY, GET_ONGKIR, GET_PROVINCES} from '../types'

const initialState = {
  getProvincesLoading: false,
  getProvincesSuccess: null,
  getProvincesFail: null,

  getCitiesLoading: false,
  getCitiesSuccess: null,
  getCitiesFail: null,

  getCityLoading: false,
  getCitySuccess: null,
  getCityFail: null,

  getOngkirLoading: false,
  getOngkirSuccess: null,
  getOngkirFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_PROVINCES:
      return {
        ...state,
        getProvincesLoading: payload.loading,
        getProvincesSuccess: payload.data,
        getProvincesFail: payload.error,
      }
    case GET_CITIES:
      return {
        ...state,
        getCitiesLoading: payload.loading,
        getCitiesSuccess: payload.data,
        getCitiesFail: payload.error,
      }
    case GET_CITY:
      return {
        ...state,
        getCityLoading: payload.loading,
        getCitySuccess: payload.data,
        getCityFail: payload.error,
      }
    case GET_ONGKIR:
      return {
        ...state,
        getOngkirLoading: payload.loading,
        getOngkirSuccess: payload.data,
        getOngkirFail: payload.error,
      }
    default:
      return state
  }
}
