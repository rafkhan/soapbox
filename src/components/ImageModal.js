import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { map } from 'lodash';

import styles from '../stylesheets/ImageModal.module.scss';
import { withUi } from '../modules/ui';
import { addImageToAlbum } from '../modules/albums';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  }
};


class ImageModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlbum: ''
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  handleSelectChange = (e) => {
    this.setState({ selectedAlbum: e.target.value })
  };

  handleAddImage = () => {
    this.props.addImageToAlbum(this.state.selectedAlbum, this.props.ui.modalContent)
    this.closeModal();
  };

  render() {

    const {
      modalOpen,
      modalContent
    } = this.props.ui;

    if(!modalContent) {
      return null;
    }

    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div>
          <img src={modalContent.src} />
        </div>
        <div className={styles.form}>
          <select
            className={styles.select}
            onChange={this.handleSelectChange}
          >
            <option value=''>---</option>
            {
              map(this.props.albums, album => (
                <option value={album.albumId}>{album.name}</option>
              ))
            }
          </select>
          <button
            onClick={this.handleAddImage}
            disabled={this.state.selectedAlbum === ''}
          >
            Add to this Album
          </button>
        </div>
        <button onClick={this.closeModal}>close</button>
      </Modal>
    );
  }
}

export default compose(
  withUi,
  connect(
    state => ({ albums: state.albums }),
    { addImageToAlbum }
  )
)(ImageModal);