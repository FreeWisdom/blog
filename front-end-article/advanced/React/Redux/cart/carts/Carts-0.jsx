import React, { Component } from 'react'
import { connect } from 'react-redux'
import memoize from 'memoize-one'

@connect(
  state => {
    return {
      products: state.cart.items
    }
  }
)
class Carts extends Component {
  state = {
    total: 0
  }

  total = memoize(
    (products) => {
      return products.reduce((sum, v) => {
        sum += v.price * v.quantity
        return sum
      }, 0)
    }
  )

  // static getDerivedStateFromProps(nextProp, prevState) {
  //   let total = nextProp.products.reduce((sum, v) => {
  //     sum += v.price * v.quantity
  //     return sum
  //   }, 0)

  //   return {
  //     total
  //   }
  // }

  render() {
    return (
      <>
        <ul>
          {
            this.props.products.map(product => {
              let { id, name, price, quantity } = product
              return (
                <li key={id}>
                  {name}: {price} x {quantity} = {price * quantity}
                </li>
              )
            })
          }
        </ul>
        <div>总价：
          {/* {
            this.props.products.reduce((total, value) => {
              total += value.price * value.quantity
              return total
            }, 0)
          } */}
          {/* {
            this.state.total
          } */}
          {
            this.total(this.props.products)
          }
          元
        </div>
      </>
    )
  }
}

export default Carts
