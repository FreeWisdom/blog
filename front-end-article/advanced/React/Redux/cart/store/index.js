import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import Immutable from 'immutable'

const initialState = Immutable.Map({})

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
)

export default store