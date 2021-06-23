import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadDataSync, incrementInventory } from './actionCreator'
import { actionCreator } from '../carts'

@connect(
  state => {
    return {
      products: state.getIn(['product', 'all'])
    }
  },
  dispatch => ({
    loadData() {
      dispatch(loadDataSync('/api/all'))
    },
    addToCart(product) {
      return () => {
        dispatch(actionCreator.addProductToCart(product))
        dispatch(incrementInventory(product))
      }
    }
  })
)
class Products extends Component {
  render() {
    return (
      <ul>
        {
          this.props.products.map(p => {
            // let { id, name, price, inventory } = product
            return (
              <li key={p.get('id')}>
                {p.get('name')} - {p.get('price')}
                <button
                  onClick={this.props.addToCart(p)}
                  disabled={p.get('inventory') === 0}
                >放入购物车</button>
              </li>
            )
          })
        }
      </ul>
    )
  }

  componentDidMount() {
    this.props.loadData()
  }
}

export default Products
