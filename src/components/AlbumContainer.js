import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map } from 'lodash';

import NewAlbum from './NewAlbum';
import Album from './Album';
import { reorderAlbumImages } from '../modules/albums';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class AlbumContainer extends Component {
  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if(source.droppableId === destination.droppableId) {
      const items = reorder(
        this.props.albums[destination.droppableId].images,
        source.index,
        destination.index
      );

      this.props.reorderAlbumImages(destination.droppableId, items);
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
              return <Album key={album.albumId} album={album} />
            }) }
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ albums: state.albums }),
  { reorderAlbumImages }
)(AlbumContainer)
