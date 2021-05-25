import { LOADDATA, DECINVENTORY } from './actionTypes'
import axios from 'axios'

export const loadData = (data) => {
  return {
    type: LOADDATA,
    data
  }
}

export const incrementInventory = (product) => {
  return {
    type: DECINVENTORY,
    product
  }
}

export const loadDataSync = (url) => {
  return (dispatch) => {
    axios.get(url)
      .then(result => {
        dispatch(loadData(result.data.list))
      })
  }
}