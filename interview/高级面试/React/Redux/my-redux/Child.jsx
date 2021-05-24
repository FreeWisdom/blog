import React, { Component } from 'react';
import store from './store/index'

class Child extends Component {
  render() {
    return (
      <div>
        {store.getState().count}
      </div>
    );
  }
}

export default Child;