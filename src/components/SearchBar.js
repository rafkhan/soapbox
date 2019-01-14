import React from 'react';
import Input from './Input';
import { withUi } from '../modules/ui';
import styles from '../stylesheets/SearchBar.module.scss';

const SearchBar = ({ ui, updateSearch }) => (
  <div className={styles.SearchBar}>
    <Input
      placeHolder='Search for a gif...'
      value={ui.search}
      onChange={value => {
        updateSearch(ui.provider, value);
      }}
    />
  </div>
);

export default withUi(SearchBar);