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
        newState.user = null;
        return newState;
      case userActionType.SIGNUP_SUCCESS:
        newState.creating = false;
        newState.created = true;
        newState.failed = false;
        newState.user = action.message;
        return newState;
      case userActionType.SIGNUP_FAILURE:
        newState.creating = false;
        newState.created = false;
        newState.failed = true;
        newState.message = null;
        newState.error = action.error.message;
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
        newState.user = null;
        console.log(`${userActionType.SIGNIN_REQUEST} ${JSON.stringify(newState)}`);
        return newState;
      case userActionType.SIGNIN_SUCCESS:
        newState.authenticating = false;
        newState.authenticated = true;
        newState.failed = false;
        newState.user = action.user;
        console.log(`${userActionType.SIGNIN_SUCCESS} ${JSON.stringify(newState)}`);
        return newState;
      case userActionType.SIGNIN_FAILURE:
        newState.authenticating = false;
        newState.authenticated = false;
        newState.failed = true;
        newState.user = null;
        newState.error = action.error.data.message;
        console.log(`${userActionType.SIGNIN_FAILURE} ${JSON.stringify(newState)}`);
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
   * This is the user verification reducer
   * it returns a new state if an action is dispatched
   */
  static completeRegistration(state = initialState.userVerification, action) {
    const newState = {};
    switch (action.type) {
      case userActionType.VERIFY_REQUEST:
        newState.verifying = true;
        newState.verified = false;
        newState.failed = false;
        newState.data = null;
        newState.error = null;
        return newState;
      case userActionType.VERIFY_SUCCESS:
        newState.verifying = false;
        newState.verified = true;
        newState.failed = false;
        newState.data = action.data;
        newState.error = null;
        return newState;
      case userActionType.VERIFY_FAILURE:
        newState.verifying = false;
        newState.verified = false;
        newState.failed = true;
        newState.data = null;
        newState.error = action.error.message;
        return newState;
      default:
        return state;
    }
  }
}
