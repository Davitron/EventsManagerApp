import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import CenterReducer from './center-reducer';


const {
  register,
  completeRegistration,
  login,
  resetPassword
} = UserReducer;

const {
  getAll,
  getAllStates,
  createCenter
} = CenterReducer;

const rootReducer = combineReducers({
  register,
  completeRegistration,
  login,
  resetPassword,
  getAll,
  getAllStates,
  createCenter
});

export default rootReducer;
