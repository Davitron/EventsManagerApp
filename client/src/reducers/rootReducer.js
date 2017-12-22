import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import UserService from '../services/user.service';


const userSignup = UserReducer.signup;
const userSignIn = UserReducer.signin;
const rootReducer = combineReducers({
  userSignup,
  userSignIn
});

export default rootReducer;
