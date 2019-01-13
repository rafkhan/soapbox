import { set } from 'lodash';
import uuid from 'uuid/v4';

const ADD_IMAGE_TO_ALBUM = 'ADD_IMAGE_TO_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';

export function addImageToAlbum(albumId, imageId, image) {
  return {
    type: ADD_IMAGE_TO_ALBUM,
    payload: {
      albumId,
      imageId,
      image
    }
  };
}

function handleAddImageToAlbum(state, { albumId, imageId, image }) {
  return set(state, [albumId, 'images', imageId], image);
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
    images: {}
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