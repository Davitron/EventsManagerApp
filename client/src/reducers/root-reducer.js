import { combineReducers } from 'redux';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  register: UserReducer.signup,
  login: UserReducer.signin
});

export default rootReducer;
