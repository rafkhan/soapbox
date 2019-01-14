import React from 'react';
import { connect } from 'react-redux';
import { searchTenor, formatResultsTenor } from './tenor';

const TENOR = 'TENOR';
// const GIPHY = 'GIPHY'; looks like I won't be using this anymore
const UPDATE_SEARCH = 'UPDATE_SEARCH';
const STORE_SEARCH_RESULTS = 'STORE_SEARCH_RESULTS';
const SET_LOADING_STATE = 'SET_LOADING_STATE';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const DEFAULT_STATE = {
  page: 0,
  provider: TENOR,
  search: '',
  searchResultsLoading: false,
  searchResults: [],

  modalOpen: false,
  modalContent: null
};

function updateSearch(provider, searchQuery) {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH,
      payload: searchQuery
    });

    dispatch(setLoading(true));

    // Giphy API was down when I made this :(
    if(provider === TENOR) {
      return searchTenor(searchQuery)
        .then(formatResultsTenor)
        .then(normalizedResults => dispatch(storeSearchResults(normalizedResults)))
        .then(() => dispatch(setLoading(false)));
    }
  };
}

function storeSearchResults(searchResults) {
  return {
    type: STORE_SEARCH_RESULTS,
    payload: searchResults
  };
}

function setLoading(isLoading) {
  return {
    type: SET_LOADING_STATE,
    payload: isLoading
  };
}

function openModal(image) {
  return {
    type: OPEN_MODAL,
    payload: image
  }
}

function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function withUi(Comp) {
  class WithUiHoc extends React.PureComponent {
    render() {
      return <Comp {...this.props} />
    }
  }

  return connect(
    state => ({ ui: state.ui }),
    {
      updateSearch,
      openModal,
      closeModal
    }
  )(WithUiHoc);
}

export default function uiReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case SET_LOADING_STATE: 
      return {
        ...state,
        searchResultsLoading: action.payload
      };
    case STORE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
        modalContent: action.payload
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
        modalContent: null
      };
    default:
      return state;
  }
}