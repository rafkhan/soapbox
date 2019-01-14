import { set, concat } from 'lodash';
import uuid from 'uuid/v4';

const ADD_IMAGE_TO_ALBUM = 'ADD_IMAGE_TO_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';

export function addImageToAlbum(albumId, image) {
  return {
    type: ADD_IMAGE_TO_ALBUM,
    payload: {
      albumId,
      image
    }
  };
}

function handleAddImageToAlbum(state, { albumId, image }) {
  const newImages = concat(state[albumId].images, image);
  return set(state, [albumId, 'images'], newImages);
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
    default:
      return state;
  }
}