import React, { Component } from 'react';
import { Provider } from 'react-redux';

import styles from './stylesheets/App.module.scss';
import store from './modules/store';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AlbumContainer from './components/AlbumContainer';
import ImageModal from './components/ImageModal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.App}>
        
          <div className={styles.searchContainer}>
            <SearchBar />
            <SearchResults />
          </div>

          <div className={styles.albumContainer}>
            <AlbumContainer />
          </div>

          <ImageModal />
        </div>
      </Provider>
    );
  }
}

export default App;
