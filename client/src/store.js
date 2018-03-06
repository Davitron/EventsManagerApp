import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/root-reducer';
import Logger from './helpers/logger';

const configureStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

configureStore.subscribe(() => {
  Logger.log('STORE SUB...', configureStore.getState());
});

export default configureStore;
