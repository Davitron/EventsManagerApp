import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import createEngine from 'redux-storage-engine-localstorage';
import rootReducer from './reducers/root-reducer';

const reducer = storage.reducer(rootReducer);

const engine = createEngine('app');
const engineMiddleware = storage.createMiddleware(engine);


const configureStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, engineMiddleware))
);

const load = storage.createLoader(engine);
load(configureStore);

load(configureStore)
  .then(newState => console.log('Loaded state:', newState)) // eslint-disable-line
  .catch(() => console.log('Failed to load previous state')); // eslint-disable-line

export default configureStore;
