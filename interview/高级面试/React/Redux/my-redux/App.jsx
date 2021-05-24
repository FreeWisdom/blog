import React, { Component } from 'react'
import store from './store'
import Child from './Child'

class App extends Component {
  handleClick = () => {
    store.dispatch({
      type: 'add'
    })
  }

  render() {
    let { count } = store.getState()
    return (
      <div>
        <h1>{count}</h1>
        <Child></Child>
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}

export default App;