import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { withUi } from '../modules/ui';
import { addImageToAlbum } from '../modules/albums';

import styles from '../stylesheets/SearchResults.module.scss';


const SearchResults = ({ ui, addImageToAlbum }) => {
  return (
    <div className={styles.SearchResults}>
      { ui.searchResultsLoading ?
        'Loading' :
        map(ui.searchResults, v => (
          <div className={styles.imageContainer}>
            <img
              onClick={() => addImageToAlbum('76b67f5e-832c-472b-9a71-b0b0948fbd75', v)}
              alt='suppressing warning with this'
              key={v.id}
              src={v.src}
            />
          </div>
        ))
      }
    </div>
  );
};

export default compose(
  withUi,
  connect(
    null,
    { addImageToAlbum }
  )
)(SearchResults);