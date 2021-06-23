// import _ from 'lodash'
import { LOADDATA, DECINVENTORY } from './actionTypes'
import { Map, List, fromJS } from 'immutable'

const defaultState = Map({
  all: List([])
})

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOADDATA:
      return state.set('all', fromJS(action.data))

    case DECINVENTORY:
      const all = state.get('all').map(product => {
        if (product.get('id') === action.product.get('id')) {
          return product.update('inventory', (v) => {
            return v - 1
          })
        }
        return product
      })
      return state.set('all', all)
    
    default:
      return state
  }
}

export default reducer