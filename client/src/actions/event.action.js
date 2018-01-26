import axios from 'axios';
import Cookies from 'universal-cookie';
import eventActionType from './actionTypes/eventActionType';
import baseUrl from '../services/baseUrl';

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
  getAll() {
    const request = () => {
      const requestAction = { type: eventActionType.GETALL_REQUEST };
      return requestAction;
    };
    const success = (events) => {
      const successAction = { type: eventActionType.GETALL_SUCCESS, events };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: eventActionType.GETALL_FAILED, error };
      return failureAction;
    };
    return (dispatch) => {
      dispatch(request());
      axios({
        method: 'GET',
        url: '/api/v1/events',
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
  createEvent(newEvent) {
    const request = (event) => {
      const requestAction = { type: eventActionType.CREATE_REQUEST, event };
      return requestAction;
    };
    const success = (event) => {
      const successAction = { type: eventActionType.CREATE_SUCCESS, event };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: eventActionType.CREATE_FAILED, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(newEvent));
      axios({
        method: 'POST',
        url: '/api/v1/events',
        headers: {
          'x-access-token': token
        },
        data: newEvent
      })
        .then((result) => {
          // const { data } = result;
          console.log(result.data);
          dispatch(success(result.data));
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
          dispatch(failure(error.response.data));
        });
    };
  }

  /**
   *
   * @param {*} eventObj
   * @returns {*}
   * this action is handles updating a event
   */
  updateEvent(eventObj) {
    const request = (event) => {
      const requestAction = { type: eventActionType.UPDATE_REQUEST, event };
      return requestAction;
    };
    const success = (event) => {
      const successAction = { type: eventActionType.UPDATE_SUCCESS, event };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: eventActionType.UPDATE_FAILED, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(eventObj));
      axios({
        method: 'PUT',
        url: `/api/v1/events/${eventObj.id}`,
        headers: {
          'x-access-token': token
        },
        data: eventObj
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
   * @param {*} id
   * @returns {*}
   * this action is handles deleting a event
  */
  deleteEvent(id) {
    const request = (eventId) => {
      const requestAction = { type: eventActionType.DELETE_REQUEST, eventId };
      return requestAction;
    };
    const success = (eventId) => {
      const successAction = { type: eventActionType.DELETE_SUCCESS, eventId };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: eventActionType.DELETE_FAILED, error };
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
