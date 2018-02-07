import mainActionType from '../actions/actionTypes/main-action-types';
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
    const newState = {};
    switch (action.type) {
      case mainActionType.GETALL_REQUEST:
        newState.status = 'fetching';
        newState.data = null;
        return newState;
      case mainActionType.GETALL_SUCCESS:
        newState.status = 'success';
        newState.data = action.data;
        return newState;
      case mainActionType.GETALL_FAILED:
        newState.status = 'failed';
        newState.data = action.data;
        return newState;
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
    const newState = {};
    switch (action.type) {
      case mainActionType.GETSTATES_REQUEST:
        newState.status = 'fetching';
        newState.data = action.data;
        return newState;
      case mainActionType.GETSTATES_SUCCESS:
        newState.status = 'success';
        newState.data = action.data;
        return newState;
      case mainActionType.GETSTATES_FAILED:
        newState.status = 'failed';
        newState.data = action.data;
        return newState;
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
    const newState = {};
    switch (action.type) {
      case mainActionType.CREATE_REQUEST:
        newState.data = null;
        newState.status = 'ongoing';
        return newState;
      case mainActionType.CREATE_SUCCESS:
        newState.data = action.data;
        newState.status = 'success';
        return newState;
      case mainActionType.CREATE_FAILED:
        newState.status = 'failed';
        newState.data = action.data;
        return newState;
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
    const newState = {};
    switch (action.type) {
      case mainActionType.UPDATE_REQUEST:
        newState.data = null;
        newState.status = 'ongoing';
        return newState;
      case mainActionType.UPDATE_SUCCESS:
        newState.data = action.data;
        newState.status = 'success';
        return newState;
      case mainActionType.UPDATE_FAILED:
        newState.status = 'failed';
        newState.data = action.data;
        return newState;
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
    const newState = {};
    switch (action.type) {
      case mainActionType.DELETE_REQUEST:
        newState.data = null;
        newState.status = 'ongoing';
        return newState;
      case mainActionType.DELETE_SUCCESS:
        newState.data = action.data;
        newState.status = 'success';
        return newState;
      case mainActionType.DELETE_FAILED:
        newState.status = 'failed';
        newState.data = action.data;
        return newState;
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
  static search(state = initialState.app, action) {
    const newState = {};
    switch (action.type) {
      case mainActionType.SEARCH_REQUEST:
        newState.data = null;
        newState.status = 'ongoing';
        return newState;
      case mainActionType.SEARCH_SUCCESS:
        newState.data = action.data;
        newState.status = 'success';
        return newState;
      case mainActionType.SEARCH_FAILURE:
        newState.data = action.data;
        newState.status = 'failed';
        return newState;
      default:
        return state;
    }
  }
}
