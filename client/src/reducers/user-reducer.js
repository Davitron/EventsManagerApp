import userActionType from '../actions/actionTypes/user-action-types';
import initialState from '../initial-state';

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
  static signup(state = initialState.user, action) {
    const newState = {};
    switch (action.type) {
      case userActionType.SIGNUP_REQUEST:
        newState.status = 'creating';
        newState.data = null;
        return newState;
      case userActionType.SIGNUP_SUCCESS:
        newState.status = 'created';
        newState.data = action.message;
        return newState;
      case userActionType.SIGNUP_FAILURE:
        newState.status = 'failed';
        newState.data = null;
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
  static signin(state = initialState.user, action) {
    const newState = {};
    switch (action.type) {
      case userActionType.SIGNIN_REQUEST:
        newState.isAuthenticated = false;
        newState.data = null;
        newState.status = 'authenticating';
        return newState;
      case userActionType.SIGNIN_SUCCESS:
        newState.isAuthenticated = true;
        newState.data = action.user;
        newState.status = 'authenticated';
        return newState;
      case userActionType.SIGNIN_FAILURE:
        newState.isAuthenticated = false;
        newState.data = null;
        newState.status = 'failed';
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
        newState.status = 'ongoing';
        newState.data = null;
        return newState;
      case userActionType.VERIFY_SUCCESS:
        newState.status = 'success';
        newState.data = action.data;
        return newState;
      case userActionType.VERIFY_FAILURE:
        newState.status = 'failed';
        newState.data = null;
        newState.error = action.error.message;
        return newState;
      default:
        return state;
    }
  }
}
