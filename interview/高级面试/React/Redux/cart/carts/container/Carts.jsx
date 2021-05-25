import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartsUi from '../ui/CartsUi'

@connect(
  state => {
    return {
      products: state.getIn(['cart', 'items'])
    }
  }
)
class Carts extends Component {
  render() {
    return (
      <CartsUi products={this.props.products}></CartsUi>
    )
  }
}

export default Carts;