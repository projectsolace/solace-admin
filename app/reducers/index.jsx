import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  admin: require('./admin').default,
  auth: require('./auth').default
})

export default rootReducer
