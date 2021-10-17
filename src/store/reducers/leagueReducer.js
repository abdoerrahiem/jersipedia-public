import {GET_LEAGUES, GET_LEAGUE} from '../types'

const initialState = {
  getLeaguesLoading: false,
  getLeaguesSuccess: null,
  getLeaguesFail: null,

  getLeagueLoading: false,
  getLeagueSuccess: null,
  getLeagueFail: null,
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_LEAGUES:
      return {
        ...state,
        getLeaguesLoading: payload.loading,
        getLeaguesSuccess: payload.data,
        getLeaguesFail: payload.error,
      }
    case GET_LEAGUE:
      return {
        ...state,
        getLeagueLoading: payload.loading,
        getLeagueSuccess: payload.data,
        getLeagueFail: payload.error,
      }
    default:
      return state
  }
}
