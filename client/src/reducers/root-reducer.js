import { combineReducers } from 'redux';
import UserReducer from './user-reducer';

const {
  register,
  completeRegistration,
  login,
  resetPassword
} = UserReducer;

const rootReducer = combineReducers({
  register,
  completeRegistration,
  login,
  resetPassword
});

export default rootReducer;
