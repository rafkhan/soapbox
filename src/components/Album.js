import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withUi } from '../modules/ui';

import styles from '../stylesheets/Album.module.scss'


class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.ui.searchResults
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  }

  render() {
    const {
      album
    } = this.props;
    console.log(album);

    return (
      <div className={styles.scrollWrapper}>
        <Droppable droppableId={album.albumId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={styles.Album}
            >
              {album.images.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <img
                        alt='suppress warning'
                        className={styles.img}
                        src={item.src}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default withUi(Album);