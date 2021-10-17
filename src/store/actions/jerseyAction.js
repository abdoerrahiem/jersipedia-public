import {
  database,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils'
import {
  DELETE_PARAMETER_JERSEY,
  GET_JERSEYS,
  GET_JERSEYS_BY_LEAGUE,
  SAVE_KEYWORD_JERSEY,
} from '../types'

export const getJerseys =
  ({id = null, keyword = null, limit = false}) =>
  dispatch => {
    dispatchLoading(dispatch, GET_JERSEYS)

    if (id) {
      database
        .ref('jerseys')
        .orderByChild('liga')
        .equalTo(id)
        .once('value', res => {
          let data = res.val()

          dispatchSuccess(dispatch, GET_JERSEYS, data)
        })
        .catch(error => {
          dispatchError(dispatch, GET_JERSEYS, error)
        })
    } else if (keyword) {
      database
        .ref('jerseys')
        .orderByChild('klub')
        .equalTo(keyword.toUpperCase())
        .once('value', res => {
          let data = res.val()

          dispatchSuccess(dispatch, GET_JERSEYS, data)
        })
        .catch(error => {
          dispatchError(dispatch, GET_JERSEYS, error)
        })
    } else if (limit) {
      database
        .ref('jerseys')
        .limitToLast(6)
        .once('value', res => {
          let data = res.val()

          dispatchSuccess(dispatch, GET_JERSEYS, data)
        })
        .catch(error => {
          dispatchError(dispatch, GET_JERSEYS, error)
        })
    } else {
      database
        .ref('jerseys')
        .once('value', res => {
          let data = res.val()

          dispatchSuccess(dispatch, GET_JERSEYS, data)
        })
        .catch(error => {
          dispatchError(dispatch, GET_JERSEYS, error)
        })
    }
  }

export const getJerseyByLeague = (id, name) => ({
  type: GET_JERSEYS_BY_LEAGUE,
  payload: {
    id,
    name,
  },
})

export const deleteParameterJersey = () => ({
  type: DELETE_PARAMETER_JERSEY,
})

export const saveKeywordJersey = search => ({
  type: SAVE_KEYWORD_JERSEY,
  payload: {
    data: search,
  },
})
