import { combineReducers } from 'redux';
import UserReducer from './user-reducer';

const {
  register,
  completeRegistration
} = UserReducer;

const rootReducer = combineReducers({
  register,
  completeRegistration
});

export default rootReducer;
