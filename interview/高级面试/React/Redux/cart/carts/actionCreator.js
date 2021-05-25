import { ADDTOCART } from './actionTypes'

export const addProductToCart = (product) => {
  return {
    type: ADDTOCART,
    product
  }
}