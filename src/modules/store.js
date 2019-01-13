import { combineReducers, createStore } from 'redux';

export const LOCAL_STORAGE_KEY = 'reduxState';

function loadState() {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(e) {
    console.error(e);
    return undefined;
  }
}

function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const localStorageState = loadState();
const store = createStore(
  combineReducers({
  }),
  localStorageState
);

store.subscribe(() => {
  saveState(store.getState());
})

export default store;