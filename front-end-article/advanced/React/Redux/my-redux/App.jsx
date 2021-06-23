import React, { Component } from 'react'
import store from './store'

class App extends Component {
  handleClickAdd = () => {
    store.dispatch({
      type: 'add'
    })
  }

  handleClickSubtract = () => {
    store.dispatch({
      type: 'subtract'
    })
  }

  listener = () => {
    let newState = store.getState()
    this.setState({
      count: newState
    })
  }

  componentDidMount() {
    store.subscribe(this.listener)
  }

  render() {
    let { count } = store.getState()
    return (
      <div>
        <button onClick={this.handleClickSubtract}>-</button>
        <h1>{count}</h1>
        <button onClick={this.handleClickAdd}>+</button>
      </div>
    );
  }
}

export default App;