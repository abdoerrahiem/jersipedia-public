import {UPDATE_ORDER} from '../types'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  database,
} from '../../utils'

export const UPDATE_PESANAN = 'UPDATE_PESANAN'

export const updateOrder = params => dispatch => {
  dispatchLoading(dispatch, UPDATE_PESANAN)

  const uid = params.order_id.split('_')[0]

  database
    .ref(`carts/${uid}`)
    .once('value', res => {
      if (res.val()) {
        const data = res.val()

        const dataBaru = {...data}
        dataBaru.ongkir = params.ongkir
        dataBaru.estimasi = params.estimasi
        dataBaru.url = params.uri
        dataBaru.order_id = params.order_id
        dataBaru.status = 'pending'

        database
          .ref(`carts/${uid}`)
          .remove()
          .then(() => {
            database
              .ref('histories')
              .child(params.order_id)
              .set(dataBaru)
              .then(response => {
                dispatchSuccess(
                  dispatch,
                  UPDATE_ORDER,
                  response ? response : [],
                )
              })
              .catch(error => {
                dispatchError(dispatch, UPDATE_ORDER, error)
              })
          })
          .catch(error => {
            dispatchError(dispatch, UPDATE_ORDER, error)
          })
      }
    })
    .catch(error => {
      dispatchError(dispatch, UPDATE_ORDER, error)
    })
}
