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
              onClick={() => addImageToAlbum('2cdde6c8-0465-4978-8aa7-ded43bb89e78', v)}
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