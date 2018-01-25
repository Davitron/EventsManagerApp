import centerActionType from '../actions/actionTypes/centerActionType';
import initialState from '../initialState';

/**
 *
 */
export default class CenterReducer {
  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This is the center creation reducer
   * it returns a new state if an action is dispatched
   */
  static getAll(state = initialState.center, action) {
    const newState = {};
    switch (action.type) {
      case centerActionType.GETALL_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'GET';
        newState.data = null;
        newState.error = null;
        return newState;
      case centerActionType.GETALL_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'GET';
        newState.data = action.centers;
        newState.error = null;
        return newState;
      case centerActionType.GETALL_FAILED:
        newState.requesting = false;
        newState.success = false;
        newState.failed = true;
        newState.requestType = 'GET';
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
   * @returns {object}
   * This reducer handles getting all states
   * it returns a new state if an action is dispatched
   */
  static getAllStates(state = initialState.center, action) {
    const newState = {};
    switch (action.type) {
      case centerActionType.GETSTATES_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'GET';
        newState.data = [];
        newState.error = null;
        return newState;
      case centerActionType.GETSTATES_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'GET';
        newState.data = action.states;
        newState.error = null;
        return newState;
      case centerActionType.GETSTATES_FAILED:
        newState.requesting = false;
        newState.success = false;
        newState.failed = true;
        newState.requestType = 'GET';
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
   * @returns {object}
   * This reducer handles creating a center
   * it returns a new state if an action is dispatched
   */
  static create(state = initialState.center, action) {
    const newState = {};
    switch (action.type) {
      case centerActionType.CREATE_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'POST';
        newState.data = null;
        newState.error = null;
        return newState;
      case centerActionType.CREATE_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'POST';
        newState.data = action.center.message;
        newState.error = null;
        return newState;
      case centerActionType.CREATE_FAILED:
        newState.requesting = false;
        newState.success = false;
        newState.failed = true;
        newState.requestType = 'POST';
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
   * @returns {object}
   * This reducer handles updating a center
   * it returns a new state if an action is dispatched
   */
  static update(state = initialState.center, action) {
    const newState = {};
    switch (action.type) {
      case centerActionType.UPDATE_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'PUT';
        newState.data = null;
        newState.error = null;
        return newState;
      case centerActionType.UPDATE_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'PUT';
        newState.data = action.center.message;
        newState.error = null;
        return newState;
      case centerActionType.UPDATE_FAILED:
        newState.requesting = false;
        newState.success = false;
        newState.failed = true;
        newState.requestType = 'PUT';
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
  * @returns {object}
   * This reducer handles creating a center
   * it returns a new state if an action is dispatched
   */
  static delete(state = initialState.center, action) {
    const newState = {};
    switch (action.type) {
      case centerActionType.DELETE_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'DELETE';
        newState.data = null;
        newState.error = null;
        return newState;
      case centerActionType.DELETE_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'DELETE';
        newState.data = action.centerId.message;
        newState.error = null;
        return newState;
      case centerActionType.DELETE_FAILED:
        newState.requesting = false;
        newState.success = false;
        newState.failed = true;
        newState.requestType = 'DELETE';
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
  * @returns {object}
   * This reducer handles creating a center
   * it returns a new state if an action is dispatched
   */
  static search(state = initialState.center, action) {
    const newState = {};
    switch (action.type) {
      case centerActionType.SEARCH_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'POST';
        newState.data = null;
        newState.error = null;
        return newState;
      case centerActionType.SEARCH_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'POST';
        newState.data = action.centers;
        newState.error = null;
        return newState;
      case centerActionType.SEARCH_FAILED:
        newState.requesting = false;
        newState.success = false;
        newState.failed = true;
        newState.requestType = 'POST';
        newState.data = null;
        newState.error = action.error.message;
        return newState;
      default:
        return state;
    }
  }
}
