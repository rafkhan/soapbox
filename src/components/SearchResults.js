import React from 'react';
import { map } from 'lodash';
import { withUi } from '../modules/ui';

import styles from '../stylesheets/SearchResults.module.scss';


const SearchResults = ({ ui }) => {
  return (
    <div className={styles.SearchResults}>
      { ui.searchResultsLoading ?
        'Loading' :
        map(ui.searchResults, v => (
          <div className={styles.imageContainer}>
            <img
              key={v.id}
              src={v.src}
            />
          </div>
            // style={{backgroundImage: `url(${v.src})`}}/>
        ))
      }
    </div>
  );
};

export default withUi(SearchResults);