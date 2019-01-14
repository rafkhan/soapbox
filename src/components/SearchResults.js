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
          <div className={styles.imageContainer} key={v.srcId}>
            <img
              onClick={() => addImageToAlbum('e63459bb-9d9d-4d55-9014-3f05c2fa9918', v)}
              alt='suppressing warning with this'
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