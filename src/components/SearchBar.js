import React from 'react';
import { withUi } from '../modules/ui';
import styles from '../stylesheets/SearchBar.module.scss';

const SearchBar = ({ ui, updateSearch }) => (
  <div className={styles.SearchBar}>
    <input
      placeHolder='Search for a gif...'
      className={styles.input}
      value={ui.search}
      onChange={e => {
        e.preventDefault();
        updateSearch(ui.provider, e.target.value);
      }}
    />
  </div>
);

export default withUi(SearchBar);