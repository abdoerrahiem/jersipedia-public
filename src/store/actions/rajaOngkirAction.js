import axios from 'axios'

import {
  API_TIMEOUT,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  ORIGIN_CITY,
  RAJA_ONGKIR_API,
  RAJA_ONGKIR_API_HEADER,
  RAJA_ONGKIR_API_HEADER_POST,
} from '../../utils'
import {GET_CITIES, GET_CITY, GET_ONGKIR, GET_PROVINCES} from '../types'

export const getProvinces = () => async dispatch => {
  dispatchLoading(dispatch, GET_PROVINCES)

  try {
    const {data, status} = await axios.get(`${RAJA_ONGKIR_API}/province`, {
      headers: RAJA_ONGKIR_API_HEADER,
      timeout: API_TIMEOUT,
    })

    if (status !== 200) {
      dispatchError(dispatch, GET_PROVINCES, data)
    } else {
      dispatchSuccess(dispatch, GET_PROVINCES, data.rajaongkir.results ?? [])
    }
  } catch (error) {
    dispatchError(dispatch, GET_PROVINCES, error)
  }
}

export const getCities = id => async dispatch => {
  dispatchLoading(dispatch, GET_CITIES)

  try {
    const {data, status} = await axios.get(
      `${RAJA_ONGKIR_API}/city?province=${id}`,
      {
        headers: RAJA_ONGKIR_API_HEADER,
        timeout: API_TIMEOUT,
      },
    )

    if (status !== 200) {
      dispatchError(dispatch, GET_CITIES, data)
    } else {
      dispatchSuccess(dispatch, GET_CITIES, data.rajaongkir.results ?? [])
    }
  } catch (error) {
    dispatchError(dispatch, GET_CITIES, error)
  }
}

export const getCity = id => async dispatch => {
  dispatchLoading(dispatch, GET_CITY)

  try {
    const {data, status} = await axios.get(`${RAJA_ONGKIR_API}/city?id=${id}`, {
      headers: RAJA_ONGKIR_API_HEADER,
      timeout: API_TIMEOUT,
    })

    if (status !== 200) {
      dispatchError(dispatch, GET_CITY, data)
    } else {
      dispatchSuccess(dispatch, GET_CITY, data.rajaongkir.results ?? [])
    }
  } catch (error) {
    dispatchError(dispatch, GET_CITY, error)
  }
}

export const getOngkir = (data, ekspedisi) => async dispatch => {
  dispatchLoading(dispatch, GET_ONGKIR)

  console.log(data.profile.city, data.totalBerat, ekspedisi.kurir)

  const formData = new URLSearchParams()
  formData.append('origin', ORIGIN_CITY)
  formData.append('destination', data.profile.city)
  formData.append('weight', data.totalBerat < 1 ? 1000 : data.totalBerat * 1000)
  formData.append('courier', ekspedisi.kurir)

  axios({
    method: 'POST',
    url: `${RAJA_ONGKIR_API}/cost`,
    timeout: API_TIMEOUT,
    headers: RAJA_ONGKIR_API_HEADER_POST,
    data: formData,
  })
    .then(res => {
      if (res.status !== 200) {
        dispatchError(dispatch, GET_ONGKIR, res)
      } else {
        const allOngkir = res.data.rajaongkir.results[0].costs
        const ongkir = allOngkir
          .filter(ong => ong.service === ekspedisi.service)
          .map(filteredOng => filteredOng)

        dispatchSuccess(dispatch, GET_ONGKIR, ongkir[0])
      }
    })
    .catch(error => dispatchError(dispatch, GET_ONGKIR, error))
}
