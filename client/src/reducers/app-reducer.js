import mainActionType from '../actions/actionTypes/mainActionType';
import initialState from '../initial-state';

/**
 *
 */
export default class AppReducer {
  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This is reducer is for creating an event or center
   * it returns a new state if an action is dispatched
   */
  static getAll(state = initialState.app, action) {
    switch (action.type) {
      case mainActionType.GETALL_REQUEST:
        return { ...state, status: 'fetching', data: null };
      case mainActionType.GETALL_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case mainActionType.GETALL_FAILED:
        return { ...state, status: 'failed', data: action.data };
      case mainActionType.RESET_STATE:
        return state;
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This is reducer is for getting an event or center
   * it returns a new state if an action is dispatched
   */
  static get(state = initialState.app, action) {
    switch (action.type) {
      case mainActionType.GET_REQUEST:
        return { ...state, status: 'fetching', data: null };
      case mainActionType.GET_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case mainActionType.GET_FAILED:
        return { ...state, status: 'failed', data: action.data };
      case mainActionType.RESET_STATE:
        return state;
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This reducer handles getting all states
   * it returns a new state if an action is dispatched
   */
  static getAllStates(state = initialState.app, action) {
    switch (action.type) {
      case mainActionType.GETSTATES_REQUEST:
        return { ...state, status: 'fetching', data: action.data };
      case mainActionType.GETSTATES_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case mainActionType.GETSTATES_FAILED:
        return { ...state, status: 'failed', data: action.data };
      case mainActionType.RESET_STATE:
        return state;
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This reducer handles creating a center
   * it returns a new state if an action is dispatched
   */
  static create(state = initialState.app, action) {
    // const newState = {};
    switch (action.type) {
      case mainActionType.CREATE_REQUEST:
        return { ...state, status: 'ongoing', data: null };
      case mainActionType.CREATE_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case mainActionType.CREATE_FAILED:
        return { ...state, status: 'failed', data: action.data };
      case mainActionType.RESET_STATE:
        return state;
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This reducer handles updating a center
   * it returns a new state if an action is dispatched
   */
  static update(state = initialState.app, action) {
    // const newState = {};
    switch (action.type) {
      case mainActionType.UPDATE_REQUEST:
        return { ...state, status: 'ongoing', data: null };
      case mainActionType.UPDATE_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case mainActionType.UPDATE_FAILED:
        return { ...state, status: 'failed', data: action.data };
      case mainActionType.RESET_STATE:
        return state;
      default:
        return state;
    }
  }

  /**
   *
   * @param {*} state
   * @param {*} action
  * @returns {object}
   * This reducer handles creating a center
   * it returns a new state if an action is dispatched
   */
  static deleteItem(state = initialState.app, action) {
    switch (action.type) {
      case mainActionType.DELETE_REQUEST:
        return { ...state, status: 'ongoing', data: null };
      case mainActionType.DELETE_SUCCESS:
        return { ...state, status: 'success', data: action.data };
      case mainActionType.DELETE_FAILED:
        return { ...state, status: 'failed', data: action.data };
      case mainActionType.RESET_STATE:
        return state;
      default:
        return state;
    }
  }
}
