import axios from 'axios'

import {
  API_TIMEOUT,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  MIDTRANS_HEADER,
  MIDTRANS_URL,
} from '../../utils'
import {ADD_TRANSACTION} from '../types'

export const addTransaction = data => dispatch => {
  dispatchLoading(dispatch, ADD_TRANSACTION)

  axios({
    method: 'POST',
    url: `${MIDTRANS_URL}/transactions`,
    headers: MIDTRANS_HEADER,
    data,
    timeout: API_TIMEOUT,
  })
    .then(res => dispatchSuccess(dispatch, ADD_TRANSACTION, res.data))
    .catch(error => dispatchError(dispatch, ADD_TRANSACTION, error))
}
