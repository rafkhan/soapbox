import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map } from 'lodash';

import NewAlbum from './NewAlbum';
import Album from './Album';

class AlbumContainer extends Component {
  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
  };

  render() {
    const {
      albums
    } = this.props;

    return (
      <div>
        <NewAlbum />
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            { map(albums, album => {
              return <Album album={album} />
            }) }
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ albums: state.albums }),
)(AlbumContainer)
