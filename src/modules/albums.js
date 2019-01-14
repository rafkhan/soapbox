import { set, concat } from 'lodash';
import uuid from 'uuid/v4';

const ADD_IMAGE_TO_ALBUM = 'ADD_IMAGE_TO_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';
const REORDER_ALBUM_IMAGES = 'REORDER_ALBUM_IMAGES';

export function addImageToAlbum(albumId, image) {
  return {
    type: ADD_IMAGE_TO_ALBUM,
    payload: {
      albumId,
      image
    }
  };
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

function handleAddImageToAlbum(state, { albumId, image }) {
  const newImages = concat(state[albumId].images, image);
  return set(state, [albumId, 'images'], newImages);
}

function handleImageReorder(state, { albumId, images }) {
  return set(state, [albumId, 'images'], images);
}

export function createAlbum(name) {
  return {
    type: CREATE_ALBUM,
    payload: {
      name
    }
  };
}

function handleCreateAlbum(state, { name }) {
  const albumId = uuid();
  const album = {
    albumId,
    name,
    images: []
  };

  return set(state, albumId, album);
}

export default function albumsReducer(state = {}, action) {
  switch(action.type) {
    case CREATE_ALBUM:
      return handleCreateAlbum(state, action.payload);
    case ADD_IMAGE_TO_ALBUM:
      return handleAddImageToAlbum(state, action.payload);
    case REORDER_ALBUM_IMAGES:
      return handleImageReorder(state, action.payload);
    default:
      return state;
  }
}