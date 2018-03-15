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
  get,
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
  get,
  getAllStates,
  create,
  update,
  deleteItem,
  search
});

export default rootReducer;
