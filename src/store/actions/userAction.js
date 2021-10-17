import {
  auth,
  clearStorage,
  dispatchSuccess,
  getData,
  dispatchLoading,
  database,
  storeData,
  dispatchError,
} from '../../utils'
import {
  GET_USER,
  LOGOUT_USER,
  UPDATE_PASSWORD_USER,
  UPDATE_USER,
} from '../types'

export const getUser = () => dispatch => {
  getData('user').then(data => {
    if (data) {
      dispatchSuccess(dispatch, GET_USER, data)
    }
  })
}

export const logoutUser = () => dispatch => {
  auth()
    .signOut()
    .then(() => {
      clearStorage()
      dispatchSuccess(dispatch, LOGOUT_USER, null)
    })
}

export const updateUser = data => dispatch => {
  dispatchLoading(dispatch, UPDATE_USER)

  const newData = {
    uid: data.uid,
    name: data.name,
    address: data.address,
    phone: data.phone,
    city: data.city,
    province: data.province,
    email: data.email,
    status: 'user',
    avatar: data.avatar ? data.newAvatar : data.oldAvatar,
  }

  database
    .ref(`/users/${newData.uid}`)
    .update(newData)
    .then(res => {
      dispatchSuccess(dispatch, UPDATE_USER, res ?? [])

      storeData('user', newData)
    })
    .catch(error => {
      dispatchError(dispatch, UPDATE_USER, error.message)
    })
}

export const updatePassword = data => dispatch => {
  dispatchLoading(dispatch, UPDATE_PASSWORD_USER)

  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      const user = auth().currentUser

      user
        .updatePassword(data.newPassword)
        .then(() => {
          database
            .ref(`/users/${data.uid}`)
            .update({password: data.uid})
            .then(res => {
              dispatchSuccess(dispatch, UPDATE_PASSWORD_USER, res ?? [])

              storeData('user', newData)
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PASSWORD_USER, error.message)
            })
        })
        .catch(error => {
          dispatchError(dispatch, UPDATE_PASSWORD_USER, error)
        })
    })
    .catch(error => {
      dispatchError(dispatch, UPDATE_PASSWORD_USER, error.message)
    })
}
