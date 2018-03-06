import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import AppReducer from './app-reducer';


const {
  register,
  completeRegistration,
  login,
  resetPassword
} = UserReducer;

const {
  getAll,
  getAllStates,
  create,
  update,
  deleteItem,
  search
} = AppReducer;

const rootReducer = combineReducers({
  register,
  completeRegistration,
  login,
  resetPassword,
  getAll,
  getAllStates,
  create,
  update,
  deleteItem,
  search
});

export default rootReducer;
