import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './modules/store';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchBar />
        <SearchResults />
      </Provider>
    );
  }
}

export default App;
