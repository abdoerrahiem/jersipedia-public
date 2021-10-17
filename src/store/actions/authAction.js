import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from '../../utils'
import {LOGIN_USER, REGISTER_USER} from '../types'
import {auth, database} from '../../utils'

export const registerUser = (data, password) => dispatch => {
  dispatchLoading(dispatch, REGISTER_USER)

  auth()
    .createUserWithEmailAndPassword(data.email, password)
    .then(({user}) => {
      const newUser = {
        ...data,
        uid: user.uid,
      }

      database.ref(`/users/${newUser.uid}`).set(newUser)

      dispatchSuccess(dispatch, REGISTER_USER, newUser)

      storeData('user', newUser)
    })
    .catch(error => {
      dispatchError(dispatch, REGISTER_USER, error.message)
    })
}

export const loginUser = (email, password) => dispatch => {
  dispatchLoading(dispatch, LOGIN_USER)

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(({user}) => {
      database
        .ref(`/users/${user.uid}`)
        .once('value')
        .then(res => {
          if (res.val()) {
            dispatchSuccess(dispatch, LOGIN_USER, res.val())

            storeData('user', res.val())
          } else {
            dispatchError(dispatch, LOGIN_USER, 'User not found')
          }
        })
    })
    .catch(error => {
      dispatchError(dispatch, LOGIN_USER, error.message)
    })
}
