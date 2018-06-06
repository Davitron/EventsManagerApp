import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import AppReducer from './AppReducer';


const {
  register,
  completeRegistration,
  login,
  resetPassword,
  forgotPassword
} = UserReducer;

const {
  getAll,
  get,
  getAllStates,
  create,
  update,
  deleteItem
} = AppReducer;

const rootReducer = combineReducers({
  register,
  completeRegistration,
  login,
  resetPassword,
  forgotPassword,
  getAll,
  get,
  getAllStates,
  create,
  update,
  deleteItem
});

export default rootReducer;
