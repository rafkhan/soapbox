import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './modules/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      </Provider>
    );
  }
}

export default App;
