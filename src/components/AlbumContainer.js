import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { map, isEqual } from 'lodash';

import NewAlbum from './NewAlbum';
import Album from './Album';
import { reorderAlbumImages, reorder, move } from '../modules/albums';
import styles from '../stylesheets/AlbumContainer.module.scss'


class AlbumContainer extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.albums, this.props.albums);
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if(source.droppableId === destination.droppableId) {
      // Dropped in same album
      const items = reorder(
        this.props.albums[destination.droppableId].images,
        source.index,
        destination.index
      );

      this.props.reorderAlbumImages(destination.droppableId, items);
    } else {
      // Dropped in different album
      const result = move(
        this.props.albums[source.droppableId].images,
        this.props.albums[destination.droppableId].images,
        source,
        destination
      );

      for (let key in result) {
        this.props.reorderAlbumImages(key, result[key]);
      }
    }
  };

  render() {
    const {
      albums
    } = this.props;
    return (
      <div>
        <NewAlbum />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className={styles.AlbumContainer}>
            { map(albums, album => {
              return <Album key={album.albumId} album={album} />
            }) }
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default connect(
  state => ({ albums: state.albums }),
  { reorderAlbumImages }
)(AlbumContainer)
