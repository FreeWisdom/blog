import React, { memo } from 'react'

const CartsUi = function (props) {
  return (
    <>
      <ul>
        {
          props.products.map(product => {
            return (
              <li key={product.get('id')}>
                {product.get('name')}: 
                {product.get('price')} x {product.get('quantity')} = 
                {product.get('price') * product.get('quantity')}
              </li>
            )
          })
        }
      </ul>
      <div>总价：
        {
          props.products.reduce((total, value) => {
            total += value.get('price') * value.get('quantity')
            return total
          }, 0)
        }
        元
      </div>
    </>
  )
}

// function areEqual(prevProps, nextProps) {
//   if (prevProps.count === nextProps.count) {
//     return true
//   } else {
//     return false
//   }
// }

export default memo(CartsUi)
