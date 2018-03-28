import axios from 'axios';
import Cookies from 'universal-cookie';
import mainActionType from './actionTypes/main-action-types';
import Dispatcher from '../helpers/dispatch';
import Logger from '../helpers/logger';
import Toast from '../helpers/toast';
import history from '../helpers/history';
import imageUpload from '../helpers/image-upload';

const CENTER_BASE_URL = '/api/v1/centers';


const cookies = new Cookies();


/**
 *
 */
export default class CenterActions {
  /**
   *@returns {*}
   * this action is handles fetching all centers
   */
  static getAll() {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GETALL_REQUEST, null));
      axios({
        method: 'GET',
        url: CENTER_BASE_URL,
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
 * @param {*} centerId - The Id of the center to fetch
 * @returns {object} - The center with the request id
 */
  static getCenter(centerId) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GET_REQUEST, null));
      axios({
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
   *@returns {*}
   * this action is handles fetching all states
   */
  static getAllStates() {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.GETSTATES_REQUEST, []));
      axios({
        method: 'GET',
        url: '/api/v1/states',
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.GETSTATES_SUCCESS, response.data));
        })
        .catch((error) => {
          dispatch(Dispatcher.action(mainActionType.GETSTATES_FAILED, error.response.data));
        });
    };
  }

  /**
   *
   * @param {*} newCenter
   *@returns {*}
   * this action is handles creating a center
   */
  static createCenter(newCenter) {
    const token = cookies.get('jwt-events-manager');
    const facilitiesString = newCenter.facilities.join();
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.CREATE_REQUEST, newCenter));
      imageUpload(newCenter.image)
        .then((imageUrl) => {
          newCenter.image = imageUrl;
          newCenter.facilities = facilitiesString;
          axios({
            method: 'POST',
            url: CENTER_BASE_URL,
            headers: {
              'x-access-token': token
            },
            data: newCenter
          })
            .then((response) => {
              Toast.remove();
              Toast.success(response.data.message);
              dispatch(Dispatcher.action(mainActionType.CREATE_SUCCESS, response.data.message));
            })
            .catch((error) => {
              const { message } = error.response.data;
              Toast.remove();
              Toast.error(message);
              dispatch(Dispatcher.action(mainActionType.CREATE_FAILED, message));
            });
        })
        .catch((error) => {
          Toast.error('Image upload error');
        });
    };
  }

  /**
   *
   * @param {*} centerObj
   * @returns {object} the response object from server
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
      .then((response) => {
        Toast.success(response.data.message);
        return response.data.message;
        // dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response.data.message));
      })
      .catch((error) => {
        const { message } = error.response.data;
        Toast.error(message);
        return error.response.data;
        // dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, message));
      });
  }
  /**
   *
   * @param {*} centerObj
   * @returns {*}
   * this action is handles updating a center
   */
  static updateCenter(centerObj) {
    const facilitiesString = centerObj.facilities.join();
    centerObj.facilities = facilitiesString;
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.UPDATE_REQUEST, centerObj));
      if (centerObj.image !== centerObj.newImage) {
        imageUpload(centerObj.newImage)
          .then((imageUrl) => {
            centerObj.image = imageUrl;
            CenterActions.handleCenterUpdate(centerObj)
              .then((response) => {
                dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response));
              })
              .then(() => {
                dispatch(Dispatcher.action(mainActionType.RESET_STATE, null));
              })
              .catch((error) => {
                dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, error));
              });
          })
          .catch((error) => {
            Toast.error('Image upload error');
          });
      } else {
        CenterActions.handleCenterUpdate(centerObj)
          .then((response) => {
            dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response));
          })
          .then(() => {
            dispatch(Dispatcher.action(mainActionType.RESET_STATE, null));
          })
          .catch((error) => {
            dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, error));
          });
      }
    };
  }
  /**
   *
   * @param {*} param
   * @returns {*}
   * this action handles searching for centers
   */
  static search(param) {
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.SEARCH_REQUEST, param));
      axios({
        method: 'POST',
        url: '/api/v1/searchcenter',
        data: param
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.SEARCH_SUCCESS, response.data));
        })
        .catch((error) => {
          dispatch(Dispatcher.action(mainActionType.SEARCH_FAILURE, error.response.data));
        });
    };
  }

  /**
   *
   * @param {*} id
   * @returns {*}
   * this action is handles deleting a center
  */
  static deleteCenter(id) {
    const token = cookies.get('jwt-events-manager');
    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.DELETE_REQUEST, id));
      axios({
        method: 'DELETE',
        url: `${CENTER_BASE_URL}/${id}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.DELETE_SUCCESS, response.data.message));
          Toast.success(response.data.message);
          history.push('/centers');
        })
        .then(() => {
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
