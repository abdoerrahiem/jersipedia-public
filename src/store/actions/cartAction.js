import {
  database,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils'
import {ADD_CART, DELETE_CART, GET_CARTS} from '../types'

export const addCart = data => dispatch => {
  dispatchLoading(dispatch, ADD_CART)

  database
    .ref(`carts/${data.uid}`)
    .once('value', res => {
      const value = res.val()

      if (value) {
        const cart = value
        const newBerat = parseInt(data.total) * parseFloat(data.jersey.berat)
        const newHarga = parseInt(data.total) * parseInt(data.jersey.harga)

        database
          .ref('carts')
          .child(data.uid)
          .update({
            totalHarga: cart.totalHarga + newHarga,
            totalBerat: cart.totalBerat + newBerat,
          })
          .then(() => dispatch(addCartDetails(data)))
          .catch(error => dispatchError(dispatch, ADD_CART, error))
      } else {
        const cart = {
          user: data.uid,
          tanggal: new Date().toDateString(),
          totalHarga: parseInt(data.total) * parseInt(data.jersey.harga),
          totalBerat: parseInt(data.total) * parseFloat(data.jersey.berat),
        }

        database
          .ref('carts')
          .child(data.uid)
          .set(cart)
          .then(() => dispatch(addCartDetails(data)))
          .catch(error => dispatchError(dispatch, ADD_CART, error))
      }
    })
    .catch(error => dispatchError(dispatch, ADD_CART, error))
}

export const addCartDetails = data => dispatch => {
  const order = {
    product: data.jersey,
    jumlahPesan: data.total,
    totalHarga: parseInt(data.total) * parseInt(data.jersey.harga),
    totalBerat: parseInt(data.total) * parseFloat(data.jersey.berat),
    desc: data.desc,
    size: data.size,
  }

  database
    .ref(`carts/${data.uid}`)
    .child('orders')
    .push(order)
    .then(res => dispatchSuccess(dispatch, ADD_CART, res ? res : []))
    .catch(error => dispatchError(dispatch, ADD_CART, error))
}

export const getCarts = id => dispatch => {
  dispatchLoading(dispatch, GET_CARTS)

  database
    .ref(`carts/${id}`)
    .once('value', res => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_CARTS, data)
    })
    .catch(error => dispatchError(dispatch, GET_CARTS, error))
}

export const deleteCart = (id, mainCart, cart) => dispatch => {
  dispatchLoading(dispatch, DELETE_CART)

  const totalHargaBaru = mainCart.totalHarga - cart.totalHarga
  const totalBeratBaru = mainCart.totalBerat - cart.totalBerat

  if (totalBeratBaru === 0) {
    database
      .ref('carts')
      .child(mainCart.user)
      .remove()
      .then(() => dispatchSuccess(dispatch, DELETE_CART, 'Cart deleted'))
      .catch(error => dispatchError(dispatch, DELETE_CART, error))
  } else {
    database
      .ref('carts')
      .child(mainCart.user)
      .update({
        totalBerat: totalBeratBaru,
        totalHarga: totalHargaBaru,
      })
      .then(() => dispatch(deleteCartDetails(id, mainCart)))
      .catch(error => dispatchError(dispatch, DELETE_CART, error))
  }
}

export const deleteCartDetails = (id, mainCart) => dispatch => {
  database
    .ref(`carts/${mainCart.user}`)
    .child('orders')
    .child(id)
    .remove()
    .then(() => dispatchSuccess(dispatch, DELETE_CART, 'Cart deleted'))
    .catch(error => dispatchError(dispatch, DELETE_CART, error))
}
