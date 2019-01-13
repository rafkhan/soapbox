import React from 'react';
import { withUi } from '../modules/ui';

const SearchResults = ({ ui }) => {
  return (
    <div>
      ok
      { ui.searchResultsLoading }
      { JSON.stringify(ui.searchResults) }
    </div>
  );
};

export default withUi(SearchResults);