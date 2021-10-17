import {combineReducers} from 'redux'
import userReducer from './userReducer'
import rajaOngkirReducer from './rajaOngkirReducer'
import authReducer from './authReducer'
import leagueReducer from './leagueReducer'
import jerseyReducer from './jerseyReducer'
import cartReducer from './cartReducer'
import paymentReducer from './paymentReducer'
import orderReducer from './orderReducer'
import historyReducer from './historyReducer'

const reducers = combineReducers({
  userReducer,
  rajaOngkirReducer,
  authReducer,
  leagueReducer,
  jerseyReducer,
  cartReducer,
  paymentReducer,
  orderReducer,
  historyReducer,
})

export default reducers
