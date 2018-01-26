import eventActionType from '../actions/actionTypes/eventActionType';
import initialState from '../initialState';

/**
 *
 */
export default class EventReducer {
  /**
   *
   * @param {*} state
   * @param {*} action
   * @returns {object}
   * This is the event creation reducer
   * it returns a new state if an action is dispatched
   */
  static getAll(state = initialState.event, action) {
    const newState = {};
    switch (action.type) {
      case eventActionType.GETALL_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'GET';
        newState.data = null;
        newState.error = null;
        return newState;
      case eventActionType.GETALL_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'GET';
        newState.data = action.events;
        newState.error = null;
        return newState;
      case eventActionType.GETALL_FAILED:
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
   * This reducer handles creating a event
   * it returns a new state if an action is dispatched
   */
  static create(state = initialState.event, action) {
    const newState = {};
    switch (action.type) {
      case eventActionType.CREATE_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'POST';
        newState.data = null;
        newState.error = null;
        return newState;
      case eventActionType.CREATE_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'POST';
        newState.data = action.event.message; 
        newState.error = null;
        return newState;
      case eventActionType.CREATE_FAILED:
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
   * This reducer handles updating a event
   * it returns a new state if an action is dispatched
   */
  static update(state = initialState.event, action) {
    const newState = {};
    switch (action.type) {
      case eventActionType.UPDATE_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'PUT';
        newState.data = null;
        newState.error = null;
        return newState;
      case eventActionType.UPDATE_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'PUT';
        newState.data = action.event.message;
        newState.error = null;
        return newState;
      case eventActionType.UPDATE_FAILED:
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
   * This reducer handles creating a event
   * it returns a new state if an action is dispatched
   */
  static delete(state = initialState.event, action) {
    const newState = {};
    switch (action.type) {
      case eventActionType.DELETE_REQUEST:
        newState.requesting = true;
        newState.success = false;
        newState.failed = false;
        newState.requestType = 'DELETE';
        newState.data = null;
        newState.error = null;
        return newState;
      case eventActionType.DELETE_SUCCESS:
        newState.requesting = false;
        newState.success = true;
        newState.failed = false;
        newState.requestType = 'DELETE';
        newState.data = action.eventId.message;
        newState.error = null;
        return newState;
      case eventActionType.DELETE_FAILED:
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
}
