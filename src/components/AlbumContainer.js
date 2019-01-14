import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { map, isEqual } from 'lodash';

import NewAlbum from './NewAlbum';
import Album from './Album';
import { reorderAlbumImages } from '../modules/albums';
import styles from '../stylesheets/AlbumContainer.module.scss'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class AlbumContainer extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.albums, this.props.albums);
  }

  onDragEnd = result => {
    const { source, destination } = result;
    console.log(destination);

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
    } else {
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
