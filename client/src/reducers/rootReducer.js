import { combineReducers } from 'redux';
import UserReducer from './userReducer';


const userSignUp = UserReducer.signup;
const userSignIn = UserReducer.signin;
const userVerification = UserReducer.completeRegistration;
const rootReducer = combineReducers({
  userSignUp,
  userSignIn,
  userVerification
});

export default rootReducer;
