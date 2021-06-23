import { combineReducers } from 'redux-immutable'
import { reducer as product } from '../products'
import { reducer as cart } from '../carts'

const reducer = combineReducers({
  product,
  cart
})

export default reducer