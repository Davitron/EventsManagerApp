import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import Toast from '../helpers/toast';
import mainActionType from './actionTypes/main-action-types';
import Dispatcher from '../helpers/dispatch';


const CENTER_BASE_URL = '/api/v1/centers';


const cookies = new Cookies();


/**
 *
 */
export default class CenterActions {
  /**
   *
   * @param {object} query - search parameters
   *
   * @param {number} page - page of centers
   *
   * @param {number} limit - amount per page
   *
   *
   * @returns {void}
   */
  static getAll(query) {
    let qString;
    let api;
    const token = cookies.get('jwt-events-manager');

    if (query) {
      query.limit = query.limit || 9;
      query.page = query.page || 1;
      qString = queryString.stringify(query, { arrayFormat: 'bracket' });
      api = `${CENTER_BASE_URL}?${qString}`;
    } else {
      api = CENTER_BASE_URL;
    }

    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GETALL_REQUEST, null));
      return axios({
        method: 'GET',
        url: api,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.GETALL_SUCCESS, response.data));
        })
        .catch((error) => {
          const err = error.response.data;
          dispatch(Dispatcher.action(mainActionType.GETALL_FAILED, err));
        });
    };
  }

  /**
 *
 * @param {number} centerId - The Id of the center to fetch
 *
 * @returns {void} - The center with the request id
 */
  static getCenter(centerId) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GET_REQUEST, null));
      return axios({
        method: 'GET',
        url: `${CENTER_BASE_URL}/${centerId}`,
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
   *@returns {void}
   * this action is handles fetching all states
   */
  static getAllStates() {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GETSTATES_REQUEST, []));
      return axios({
        method: 'GET',
        url: '/api/v1/states',
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          const { states } = response.data;
          dispatch(Dispatcher.action(mainActionType.GETSTATES_SUCCESS, states));
        })
        .catch((error) => {
          dispatch(Dispatcher.action(mainActionType.GETSTATES_FAILED, error.response.data));
        });
    };
  }

  // TODO: find a way to remove or mock history.push
  /**
   *
   * @param {object} newCenter
   *
   * @returns {void}
   * this action is handles creating a center
   */
  static createCenter(newCenter) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.CREATE_REQUEST, newCenter));
      return axios({
        method: 'POST',
        url: CENTER_BASE_URL,
        headers: {
          'x-access-token': token
        },
        data: newCenter
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.CREATE_SUCCESS, response.data.message));
          dispatch(CenterActions.getAll({ page: 1 }));
          // history.push('/centers?page=1');
        })
        .then(() => {
          dispatch(Dispatcher.action(mainActionType.RESET_STATE, null));
        })
        .catch((error) => {
          const { message } = error.response.data;
          dispatch(Dispatcher.action(mainActionType.CREATE_FAILED, message));
        });
    };
  }

  /**
   *
   * @param {object} centerObj
   *
   * @returns {string | object} the response from server
   */
  static handleCenterUpdate(centerObj) {
    const token = cookies.get('jwt-events-manager');
    return axios({
      method: 'PUT',
      url: `${CENTER_BASE_URL}/${centerObj.id}`,
      headers: {
        'x-access-token': token
      },
      data: centerObj
    })
      .then(response => response)
      .catch((error) => {
        const { data: { message } } = error.response;
        throw (message);
      });
  }
  /**
   *
   * @param {object} centerObj
   *
   * @returns {void}
   * this action is handles updating a center
   */
  static updateCenter(centerObj) {
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.UPDATE_REQUEST, centerObj));
      return CenterActions.handleCenterUpdate(centerObj)
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response.data));
          dispatch(CenterActions.getCenter(centerObj.id));
          Toast.success(response.data.message);
        })
        .catch((error) => {
          dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, error));
        });
    };
  }

  /**
   *
   * @param {number} id
   *
   * @param {function} history
   *
   * @returns {void}
   * this action is handles deleting a center
  */
  static deleteCenter(id, history) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.DELETE_REQUEST, id));
      return axios({
        method: 'DELETE',
        url: `${CENTER_BASE_URL}/${id}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.DELETE_SUCCESS, response.data.message));
          Toast.success(response.data.message);
          dispatch(Dispatcher.action(mainActionType.RESET_STATE, null));
          history.push('/centers');
        })
        .catch((error) => {
          const { message } = error.response.data;
          dispatch(Dispatcher.action(mainActionType.DELETE_FAILED, message));
          Toast.error(message);
        });
    };
  }
}
