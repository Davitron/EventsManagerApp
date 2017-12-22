import userActionType from '../actions/actionTypes/userAtionType';
import initialState from '../initialState';

/**
 * This reducer class handles all user actions
 */
export default class UserReducer {
  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This is the user signup reducer
   * it returns a new state if an action is dispatched
   */
  static signup(state = initialState.userCreation, action) {
    const newState = {};
    switch (action.type) {
      case userActionType.SIGNUP_REQUEST:
        newState.creating = true;
        newState.created = false;
        newState.failed = false;
        console.log(`${userActionType.SIGNUP_REQUEST} ${newState}`);
        return newState;
      case userActionType.SIGNUP_SUCCESS:
        newState.creating = false;
        newState.created = true;
        newState.failed = false;
        console.log(`${userActionType.SIGNUP_SUCCESS} ${newState}`);
        return newState;
      case userActionType.SIGNUP_FAILURE:
        newState.creating = false;
        newState.created = false;
        newState.failed = true;
        console.log(`${userActionType.SIGNUP_FAILURE} ${newState}`);
        return newState;
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {*}
   * This is the user signup reducer
   * it returns a new state if an action is dispatched
   */
  static signin(state = initialState.userAuthentication, action) {
    const newState = {};
    switch (action.type) {
      case userActionType.SIGNIN_REQUEST:
        newState.authenticating = true;
        newState.authenticated = false;
        newState.failed = false;
        console.log(`${userActionType.SIGNIN_REQUEST} ${newState}`);
        return newState;
      case userActionType.SIGNIN_SUCCESS:
        newState.authenticating = false;
        newState.authenticated = true;
        newState.failed = false;
        console.log(`${userActionType.SIGNIN_SUCCESS} ${newState}`);
        return newState;
      case userActionType.SIGNIN_FAILURE:
        newState.authenticating = false;
        newState.authenticated = false;
        newState.failed = true;
        console.log(`${userActionType.SIGNIN_FAILURE} ${newState}`);
        return newState;
      default:
        return state;
    }
  }
}
