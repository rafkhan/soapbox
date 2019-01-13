const TENOR = 'TENOR';
const GIPHY = 'GIPHY';

const DEFAULT_STATE = {
  page: 0,
  provider: TENOR,
  search: '',
  searchResultsLoading: false,
};

export default function albumsReducer(state = {}, action) {
  switch(action.type) {
    default:
      return state;
  }
}