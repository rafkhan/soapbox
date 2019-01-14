import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from '../stylesheets/NewAlbum.module.scss';
import Input from './Input';
import { createAlbum } from '../modules/albums';

class NewAlbum extends Component {
  state = {
    albumNameInput: ''
  };

  render() {
    return (
      <div>
        <Input
          type='text'
          placeHolder='New Album Name'
          className={styles.input}
          value={this.state.albumNameInput}
          onChange={value => {
            this.setState({ albumNameInput: value })
          }}
        />
        <button onClick={() => {
          this.props.createAlbum(this.state.albumNameInput);
          this.setState({ albumNameInput: '' })
        }}>
          Create New Album
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { createAlbum }
)(NewAlbum)
