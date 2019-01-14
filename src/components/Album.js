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
  }

  render() {
    const {
      album
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <h3>{ album.name }</h3>
        <Droppable droppableId={album.albumId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={styles.Album}
            >
              {album.images.map((item, index) => (
                <Draggable key={`${item.id}-${album.albumId}`} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className={styles.droppable}
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