export const dispatchLoading = (dispatch, type) => {
  return dispatch({
    type,
    payload: {
      loading: true,
      data: null,
      error: null,
    },
  })
}

export const dispatchSuccess = (dispatch, type, data) => {
  return dispatch({
    type,
    payload: {
      loading: false,
      data,
      error: null,
    },
  })
}

export const dispatchError = (dispatch, type, error) => {
  return dispatch({
    type,
    payload: {
      loading: false,
      data: null,
      error,
    },
  })
}
