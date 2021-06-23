// import _ from 'lodash'
import { ADDTOCART } from './actionTypes'
import { Map, List } from 'immutable'

const defaultState = Map({
  items: List([]),
  count: 0
})

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADDTOCART:
      let index = state.get('items').findIndex((p) => {
        return p.get('id') === action.product.get('id')
      })

      if (index !== -1) {
        return state.updateIn(['items', index, 'quantity'], v => v + 1)
      } else {
        let result = state.update('items', v => v.push(action.product.merge({quantity: 1})))
        return result
      }
     
    default:
      return state
  }
}

export default reducer