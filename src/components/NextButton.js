import React from 'react';
import styles from '../stylesheets/NextButton.module.scss';
import { withUi } from '../modules/ui';

const NextButton = ({ ui, updateSearch }) => {
  if(ui.searchPosition === 0) {
    return null;
  }
    

  if(ui.search === '') {
    return null;
  }

  return (
    <button
      className={styles.NextButton}
      onClick={() => updateSearch(ui.provider, ui.search, ui.searchPosition)}
    >
      Next
    </button>
  );
};

export default withUi(NextButton);