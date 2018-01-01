import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import CenterReducer from './centerReducer';


const userSignUp = UserReducer.signup;
const userSignIn = UserReducer.signin;
const userVerification = UserReducer.completeRegistration;
const getAllCenters = CenterReducer.getAll;
const rootReducer = combineReducers({
  userSignUp,
  userSignIn,
  userVerification,
  getAllCenters
});

export default rootReducer;
