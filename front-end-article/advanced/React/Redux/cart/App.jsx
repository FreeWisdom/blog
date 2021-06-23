import React, { Component } from 'react'
import { Products } from './products'
import { Carts } from './carts'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>产品列表</h1><hr/>
        <Products></Products>
        <h2>购物车</h2><hr/>
        <Carts></Carts>
      </div>
    )
  }
}
