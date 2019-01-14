import { set, concat, cloneDeep } from 'lodash';
import uuid from 'uuid/v4';

const ADD_IMAGE_TO_ALBUM = 'ADD_IMAGE_TO_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';
const REORDER_ALBUM_IMAGES = 'REORDER_ALBUM_IMAGES';

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


export function addImageToAlbum(albumId, image) {
  return {
    type: ADD_IMAGE_TO_ALBUM,
    payload: {
      albumId,
      image,
      imageId: uuid()
    }
  };
}

function handleAddImageToAlbum(state, { albumId, image, imageId }) {
  const album = cloneDeep(state[albumId]); // force shallow eq to fail
  const newImages = concat(album.images, { ...image, id: imageId });
  album.images = newImages;
  return album;
}

export function reorderAlbumImages(albumId, images) {
  return {
    type: REORDER_ALBUM_IMAGES,
    payload: {
      albumId,
      images
    }
  };
}

function handleImageReorder(state, { albumId, images }) {
  const album = cloneDeep(state[albumId]); // force shallow eq to fail
  album.images = images;
  return album;
}

export function createAlbum(name) {
  return {
    type: CREATE_ALBUM,
    payload: {
      name
    }
  };
}

function handleCreateAlbum({ name }) {
  const albumId = uuid();
  const album = {
    albumId,
    name,
    images: []
  };

  return album;
}

export default function albumsReducer(state = {}, action) {
  let updatedAlbum;
  switch(action.type) {
    case CREATE_ALBUM:
      updatedAlbum = handleCreateAlbum(action.payload);
      return {
        ...state,
        [updatedAlbum.albumId]: updatedAlbum
      };
    case ADD_IMAGE_TO_ALBUM:
      updatedAlbum = handleAddImageToAlbum(state, action.payload);
      return {
        ...state,
        [updatedAlbum.albumId]: updatedAlbum
      };
    case REORDER_ALBUM_IMAGES:
      updatedAlbum = handleImageReorder(state, action.payload);
      return {
        ...state,
        [updatedAlbum.albumId]: updatedAlbum
      };
    default:
      return state;
  }
}