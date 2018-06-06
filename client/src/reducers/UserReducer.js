import userActionType from '../actions/actionTypes/userActionType';
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
  static register(state = initialState.user, action) {
    switch (action.type) {
      case userActionType.SIGNUP_REQUEST:
        return { ...state, status: 'creating', data: null };
      case userActionType.SIGNUP_SUCCESS:
        return { ...state, status: 'created', data: action.data };
      case userActionType.SIGNUP_FAILURE:
        return { ...state, status: 'failed', data: action.data };
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
  static login(state = initialState.user, action) {
    switch (action.type) {
      case userActionType.SIGNIN_REQUEST:
        return {
          ...state,
          isAuthenticated: false,
          data: null,
          status: 'authenticating'
        };
      case userActionType.SIGNIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          data: action.data,
          status: 'authenticated'
        };
      case userActionType.SIGNOUT:
        return initialState.user;
      case userActionType.SIGNIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          data: action.data,
          status: 'failed'
        };
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
  static completeRegistration(state = initialState.user, action) {
    switch (action.type) {
      case userActionType.VERIFY_REQUEST:
        return { ...state, status: 'ongoing', data: null };
      case userActionType.VERIFY_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case userActionType.VERIFY_FAILURE:
        return { ...state, status: 'failed', data: action.data };
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {*}
   * This is a reducer for password reset
   * it returns a new state if an action is dispatched
   */
  static forgotPassword(state = initialState.user, action) {
    switch (action.type) {
      case userActionType.FORGOT_PASSWORD_REQUEST:
        return { ...state, status: 'ongoing', data: null };
      case userActionType.FORGOT_PASSWORD_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case userActionType.FORGET_PASSWORD_FAILURE:
        return { ...state, status: 'failed', data: action.data };
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {*}
   * This is a reducer for password reset
   * it returns a new state if an action is dispatched
   */
  static resetPassword(state = initialState.user, action) {
    switch (action.type) {
      case userActionType.RESET_REQUEST:
        return { ...state, status: 'ongoing', data: null };
      case userActionType.RESET_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case userActionType.RESET_FAILURE:
        return { ...state, status: 'failed', data: action.data };
      default:
        return state;
    }
  }
}
