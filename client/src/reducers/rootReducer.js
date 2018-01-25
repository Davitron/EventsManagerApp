import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import CenterReducer from './centerReducer';
import EventReducer from './eventReducer';


const userSignUp = UserReducer.signup;
const userSignIn = UserReducer.signin;
const userVerification = UserReducer.completeRegistration;
const getAllCenters = CenterReducer.getAll;
const getAllEvents = EventReducer.getAll;
const getStates = CenterReducer.getAllStates;
const createCenter = CenterReducer.create;
const updateCenter = CenterReducer.update;
const deleteCenter = CenterReducer.delete;
const searchCenter = CenterReducer.search;
const createEvent = EventReducer.create;
const updateEvent = EventReducer.update;
const deleteEvent = EventReducer.delete;

const rootReducer = combineReducers({
  userSignUp,
  userSignIn,
  userVerification,
  getAllCenters,
  getStates,
  createCenter,
  updateCenter,
  deleteCenter,
  searchCenter,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents
});

export default rootReducer;
