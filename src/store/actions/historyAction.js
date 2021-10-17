import axios from 'axios'

import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  API_TIMEOUT,
  MIDTRANS_URL_STATUS,
  MIDTRANS_HEADER,
  database,
} from '../../utils'
import {GET_HISTORIES, UPDATE_STATUS} from '../types'

export const getHistories = uid => dispatch => {
  dispatchLoading(dispatch, GET_HISTORIES)

  database
    .ref('histories')
    .orderByChild('user')
    .equalTo(uid)
    .once('value', querySnapshot => {
      let data = querySnapshot.val()

      dispatchSuccess(dispatch, GET_HISTORIES, data)
    })
    .catch(error => {
      dispatchError(dispatch, GET_HISTORIES, error)
    })
}

export const updateStatus = order_id => dispatch => {
  dispatchLoading(dispatch, UPDATE_STATUS)

  axios({
    method: 'GET',
    url: `${MIDTRANS_URL_STATUS}/${order_id}/status`,
    headers: MIDTRANS_HEADER,
    timeout: API_TIMEOUT,
  })
    .then(response => {
      const status =
        response.data.transaction_status === 'settlement' ||
        response.data.transaction_status === 'capture'
          ? 'lunas'
          : response.data.transaction_status
          ? response.data.transaction_status
          : 'pending'

      database
        .ref('histories')
        .child(order_id)
        .update({
          status,
        })
        .then(response => {
          dispatchSuccess(dispatch, UPDATE_STATUS, response ? response : [])
        })
        .catch(error => {
          dispatchError(dispatch, UPDATE_STATUS, error)
        })
    })
    .catch(error => {
      dispatchError(dispatch, UPDATE_STATUS, error)
    })
}
