import axios from 'axios';
import Cookies from 'universal-cookie';
import mainActionType from './actionTypes/main-action-types';
import Dispatcher from '../helpers/dispatch';
import Logger from '../helpers/logger';
import Toast from '../helpers/toast';
import Modal from '../helpers/modal-control';
import history from '../helpers/history';


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
        url: '/api/v1/centers',
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          console.log(response.data);
          dispatch(Dispatcher.action(mainActionType.GETALL_SUCCESS, response.data));
        })
        .catch((error) => {
          const err = error.response.data;
          dispatch(Dispatcher.action(mainActionType.GETALL_FAILED, err));
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
    const facilitiesStr = newCenter.facilities.join();
    const formData = new FormData();
    formData.append('name', newCenter.name);
    formData.append('stateId', newCenter.stateId);
    formData.append('address', newCenter.address);
    formData.append('hallCapacity', newCenter.hallCapacity);
    formData.append('carParkCapacity', newCenter.carParkCapacity);
    formData.append('image', newCenter.image);
    formData.append('facilities', facilitiesStr);
    formData.append('price', newCenter.price);

    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.CREATE_REQUEST, newCenter));
      axios({
        method: 'POST',
        url: '/api/v1/centers',
        headers: {
          'x-access-token': token
        },
        data: formData
      })
        .then((response) => {
          Toast.remove();
          Toast.success(response.data.message);
          dispatch(Dispatcher.action(mainActionType.CREATE_SUCCESS, response.data.message));
        })
        .catch((error) => {
          Toast.remove();
          Toast.error(error.response.data.message);
          dispatch(Dispatcher.action(mainActionType.CREATE_FAILED, error.response.data.message));
        });
    };
  }

  /**
   *
   * @param {*} centerObj
   * @returns {*}
   * this action is handles updating a center
   */
  static updateCenter(centerObj) {
    const token = cookies.get('jwt-events-manager');
    const facilitiesStr = centerObj.facilities.join();
    const formData = new FormData();
    formData.append('name', centerObj.name);
    formData.append('stateId', centerObj.stateId);
    formData.append('address', centerObj.address);
    formData.append('hallCapacity', centerObj.hallCapacity);
    formData.append('carParkCapacity', centerObj.carParkCapacity);
    formData.append('image', centerObj.image);
    formData.append('facilities', facilitiesStr);
    formData.append('price', centerObj.price);

    return (dispatch) => {
      dispatch(Dispatcher.action(mainActionType.UPDATE_REQUEST, centerObj));
      axios({
        method: 'PUT',
        url: `/api/v1/centers/${centerObj.id}`,
        headers: {
          'x-access-token': token
        },
        data: formData
      })
        .then((response) => {
          Toast.success(response.data.message);
          dispatch(Dispatcher.action(mainActionType.UPDATE_SUCCESS, response.data.message));
        })
        .catch((error) => {
          const { message } = error.response.data.message;
          Toast.error(message);
          dispatch(Dispatcher.action(mainActionType.UPDATE_FAILED, message));
        });
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
        url: `/api/v1/centers/${id}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((response) => {
          dispatch(Dispatcher.action(mainActionType.DELETE_SUCCESS, response.data.message));
          Toast.success(response.data.message);
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
