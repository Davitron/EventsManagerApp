import { combineReducers } from 'redux';
import UserReducer from './userReducer';


const userSignUp = UserReducer.signup;
const userSignIn = UserReducer.signin;
const rootReducer = combineReducers({
  userSignUp,
  userSignIn
});

export default rootReducer;
