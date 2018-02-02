import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import AuthChecker from '../helpers/authChecker';

const configureStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

configureStore.subscribe(() => {
  console.log('STORE SUB...', configureStore.getState());
});

new AuthChecker().isSignedIn();
export default configureStore;
