import {
  database,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils'
import {GET_LEAGUE, GET_LEAGUES} from '../types'

export const getLeagues = () => dispatch => {
  dispatchLoading(dispatch, GET_LEAGUES)

  database
    .ref('ligas')
    .once('value', res => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_LEAGUES, data)
    })
    .catch(error => {
      dispatchError(dispatch, GET_LEAGUES, error)
    })
}

export const getLeague = id => dispatch => {
  dispatchLoading(dispatch, GET_LEAGUE)

  database
    .ref(`ligas/${id}`)
    .once('value', res => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_LEAGUE, data)
    })
    .catch(error => {
      dispatchError(dispatch, GET_LEAGUE, error)
    })
}
