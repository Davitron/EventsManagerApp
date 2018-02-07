import axios from 'axios';
import Cookies from 'universal-cookie';
import mainActionType from './actionTypes/main-action-types';
import Dispatcher from '../helpers/dispatch';
import Logger from '../helpers/logger';
import Toast from '../helpers/toast';
import Modal from '../helpers/modal-control';


const cookies = new Cookies();
const token = cookies.get('jwt-events-manager');

/**
 *
 */
export default class EventActions {
  /**
   *@returns {*}
   * this action is handles fetching all events
   */
  static getAll() {
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GETALL_REQUEST, null));
      axios({
        method: 'GET',
        url: '/api/v1/events',
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          Toast.success(response.data.message);
          dispatch(Dispatcher.action(mainActionType.GETALL_SUCCESS, response.data));
        })
        .catch((error) => {
          // console.log(error.response);
          dispatch(Dispatcher.action(mainActionType.GETALL_FAILED, error.response.data));
        });
    };
  }

  /**
   *@param {*} centerId
   *@returns {*}
   * this action is handles fetching all events
   */
  getPendingEvent(centerId) {
    const request = () => {
      const requestAction = { type: mainActionType.GETALL_REQUEST };
      return requestAction;
    };
    const success = (events) => {
      const successAction = { type: mainActionType.GETALL_SUCCESS, events };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: mainActionType.GETALL_FAILED, error };
      return failureAction;
    };
    return (dispatch) => {
      dispatch(request());
      axios({
        method: 'GET',
        url: `/api/v1/events/pending/${centerId}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((result) => {
          dispatch(success(result.data));
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(failure(error.response.data));
        });
    };
  }


  /**
   *
   * @param {*} newEvent
   *@returns {*}
   * this action is handles creating a event
   */
  static createEvent(newEvent) {
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.CREATE_REQUEST, newEvent));
      axios({
        method: 'POST',
        url: '/api/v1/events',
        headers: {
          'x-access-token': token
        },
        data: newEvent
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
    };
  }

  /**
   *
   * @param {*} eventObj
   * @returns {*}
   * this action is handles updating a event
   */
  static updateEvent(eventObj) {
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.UPDATE_REQUEST, eventObj));
      axios({
        method: 'PUT',
        url: `/api/v1/events/${eventObj.id}`,
        headers: {
          'x-access-token': token
        },
        data: eventObj
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response.data.message));
          Toast.success(response.data.message);
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
   * @param {*} eventId
   * @returns {*}
   * this action is handles updating a event
   */
  approveEvent(eventId) {
    const request = (event) => {
      const requestAction = { type: mainActionType.UPDATE_REQUEST, event };
      return requestAction;
    };
    const success = (event) => {
      const successAction = { type: mainActionType.UPDATE_SUCCESS, event };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: mainActionType.UPDATE_FAILED, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(eventId));
      axios({
        method: 'PUT',
        url: `/api/v1/events/approve/${eventId}`,
        headers: {
          'x-access-token': token
        },
      })
        .then((result) => {
          dispatch(success(result.data));
          Materialize.toast(result.data.message, 4000, 'cyan');
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(failure(error.response.data));
          Materialize.toast(error.response.data.message, 4000, 'red');
        });
    };
  }

  /**
   *
   * @param {*} eventObj
   * @returns {*}
   * this action is handles updating a event
   */
  rejectEvent(eventObj) {
    const request = (event) => {
      const requestAction = { type: mainActionType.UPDATE_REQUEST, event };
      return requestAction;
    };
    const success = (event) => {
      const successAction = { type: mainActionType.UPDATE_SUCCESS, event };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: mainActionType.UPDATE_FAILED, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(eventObj));
      axios({
        method: 'PUT',
        url: `/api/v1/events/reject/${eventObj.id}`,
        headers: {
          'x-access-token': token
        },
        data: eventObj
      })
        .then((result) => {
          dispatch(success(result.data));
          Materialize.toast(result.data.message, 4000, 'cyan');
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(failure(error.response.data));
          Materialize.toast(error.response.data.message, 4000, 'red');
        });
    };
  }

  /**
   *
   * @param {*} id
   * @returns {*}
   * this action is handles deleting a event
  */
  deleteEvent(id) {
    const request = (eventId) => {
      const requestAction = { type: mainActionType.DELETE_REQUEST, eventId };
      return requestAction;
    };
    const success = (eventId) => {
      const successAction = { type: mainActionType.DELETE_SUCCESS, eventId };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: mainActionType.DELETE_FAILED, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(id));
      axios({
        method: 'DELETE',
        url: `/api/v1/events/${id}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((result) => {
          dispatch(success(result.data));
        })
        .catch((error) => {
          dispatch(failure(error.response.data));
        });
    };
  }
}
