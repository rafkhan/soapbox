import React from 'react';
import { withUi } from '../modules/ui';

const SearchBar = ({ ui, updateSearch }) => (
  <input
    value={ui.search}
    onChange={e => {
      e.preventDefault();
      updateSearch(ui.provider, e.target.value);
    }}
  />
);

export default withUi(SearchBar);