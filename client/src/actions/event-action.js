import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import mainActionType from './actionTypes/main-action-types';
import Dispatcher from '../helpers/dispatch';
import Logger from '../helpers/logger';
import Toast from '../helpers/toast';
import imageUpload from '../helpers/image-upload';

const EVENT_BASE_URL = '/api/v1/events';

const cookies = new Cookies();

/**
 *
 */
export default class EventActions {
  /**
   * @param {object} query
   *@returns {void}
   * this action is handles fetching all events
   */
  static getAll(query) {
    let qString;
    let api;
    if (query) {
      query.limit = query.limit || 9;
      query.page = query.page || 1;
      qString = queryString.stringify(query);
      api = `${EVENT_BASE_URL}?${qString}`;
    } else {
      api = EVENT_BASE_URL;
    }
    return (dispatch) => {
      const token = cookies.get('jwt-events-manager');
      dispatch(Dispatcher.action(mainActionType.GETALL_REQUEST, null));
      axios({
        method: 'GET',
        url: api,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          const { data } = response;
          Toast.success(data.message);
          dispatch(Dispatcher.action(mainActionType.GETALL_SUCCESS, data));
        })
        .catch((error) => {
          // console.log(error.response);
          dispatch(Dispatcher.action(mainActionType.GETALL_FAILED, error.response.data));
        });
    };
  }

  /**
   *@param {number} eventId - The Id of the center to fetch
   *
   *@returns {void}
   *
   */
  static getEvent(eventId) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GET_REQUEST, null));
      axios({
        method: 'GET',
        url: `/api/v1/events/${eventId}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.GET_SUCCESS, response.data));
        })
        .catch((error) => {
          const err = error.response.data;
          dispatch(Dispatcher.action(mainActionType.GET_FAILED, err));
        });
    };
  }

  /**
   *@param {number} centerId
   *
   *@returns {void}
   *
   */
  static getPendingEvent(centerId) {
    return (dispatch) => {
      const token = cookies.get('jwt-events-manager');
      dispatch(Dispatcher.action(mainActionType.GETALL_REQUEST, null));
      axios({
        method: 'GET',
        url: `/api/v1/events/pending/${centerId}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          Logger.log(response.data);
          dispatch(Dispatcher.action(mainActionType.GETALL_SUCCESS, response.data));
          if (response.data.pendingEvents.length === 0) {
            Toast.info('There are no pending events for this center.');
          }
        })
        .catch((error) => {
          dispatch(Dispatcher.action(mainActionType.GETALL_FAILED, error.response.data));
        });
    };
  }

  /**
   * @param {number} centerId
   *
   * @returns {void}
   */
  static getUpcomingEvent(centerId) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GETALL_REQUEST, null));
      axios({
        method: 'GET',
        url: `/api/v1/events/upcoming/${centerId}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          Logger.log(response.data);
          dispatch(Dispatcher.action(mainActionType.GETALL_SUCCESS, response.data));
        })
        .catch((error) => {
          dispatch(Dispatcher.action(mainActionType.GETALL_FAILED, error.response.data));
        });
    };
  }

  /**
   *
   * @param {object} event
   *
   * @param {string} token
   *
   * @param {function} dispatch
   *
   * @return {void}
   */
  static handleCreateEvent(event, token, dispatch) {
    dispatch(Dispatcher.action(mainActionType.CREATE_REQUEST, event));
    axios({
      method: 'POST',
      url: '/api/v1/events',
      headers: {
        'x-access-token': token
      },
      data: event
    })
      .then((response) => {
        const { message } = response.data;
        dispatch(Dispatcher.action(mainActionType.CREATE_SUCCESS, message));
        Toast.success(message);
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch(Dispatcher.action(mainActionType.CREATE_FAILED, message));
        Toast.error(message);
      });
  }


  /**
   *
   * @param {object} newEvent
   *
   * @returns {void}
   *
   */
  static createEvent(newEvent) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      EventActions.handleCreateEvent(newEvent, token, dispatch);
    };
  }

  /**
 *
 * @param {object} eventObj
 *
 * @param {token} token
 *
 * @param {function} dispatch
 *
 * @returns {void}
 */
  static handleEventUpdate(eventObj, token, dispatch) {
    dispatch(Dispatcher.action(mainActionType.UPDATE_REQUEST, eventObj));
    return axios({
      method: 'PUT',
      url: `/api/v1/events/${eventObj.id}`,
      headers: {
        'x-access-token': token
      },
      data: eventObj
    })
      .then((response) => {
        Toast.success(response.data.message);
        dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response.data.message));
        dispatch(EventActions.getAll());
      })
      .catch((error) => {
        const { message } = error.response.data;
        Toast.error(message);
        dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, message));
      });
  }

  /**
   *
   * @param {object} eventObj
   *
   * @returns {void}
   *
   * this action is handles updating a event
   */
  static updateEvent(eventObj) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      if (eventObj.newImage) {
        imageUpload(eventObj.newImage)
          .then((imageUrl) => {
            eventObj.image = imageUrl;
            EventActions.handleEventUpdate(eventObj, token, dispatch);
          });
      } else {
        EventActions.handleEventUpdate(eventObj, token, dispatch);
      }
    };
  }

  /**
   *
   * @param {object} response
   *
   * @returns {void}
   *
   * this action is handles updating a event
   */
  static respondToEvent(response) {
    return (dispatch) => {
      const token = cookies.get('jwt-events-manager');
      dispatch(Dispatcher.action(mainActionType.UPDATE_REQUEST, response.id));
      axios({
        method: 'PUT',
        url: '/api/v1/events/response/',
        headers: {
          'x-access-token': token
        },
        data: response
      })
        .then((result) => {
          const { message } = result.data;
          dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, message));
          Toast.success(message);
          const query = queryString.parse(window.location.search);
          dispatch(EventActions.getAll(query));
        })
        .then(() => {
          dispatch(Dispatcher.action(mainActionType.RESET_STATE, null));
        })
        .catch((error) => {
          const { message } = error.response.data;
          dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, message));
          Toast.error(message);
        });
    };
  }

  /**
   *
   * @param {number} id
   *
   * @returns {void}
   *
   * this action is handles deleting a event
  */
  static deleteEvent(id) {
    return (dispatch) => {
      const token = cookies.get('jwt-events-manager');
      dispatch(Dispatcher.action(mainActionType.DELETE_REQUEST, id));
      axios({
        method: 'DELETE',
        url: `/api/v1/events/${id}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.DELETE_SUCCESS, response.data));
          Toast.success(response.data.message);
          dispatch(EventActions.getAll());
          dispatch(Dispatcher.action(mainActionType.RESET_STATE, null));
        })
        .catch((error) => {
          const { message } = error.response.data;
          dispatch(Dispatcher.action(mainActionType.DELETE_FAILED, message));
          Toast.error(message);
        });
    };
  }
}
