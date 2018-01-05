import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import CenterReducer from './centerReducer';


const userSignUp = UserReducer.signup;
const userSignIn = UserReducer.signin;
const userVerification = UserReducer.completeRegistration;
const getAllCenters = CenterReducer.getAll;
const getStates = CenterReducer.getAllStates;
const createCenter = CenterReducer.create;
const rootReducer = combineReducers({
  userSignUp,
  userSignIn,
  userVerification,
  getAllCenters,
  getStates,
  createCenter
});

export default rootReducer;
