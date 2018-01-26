import axios from 'axios';
import Cookies from 'universal-cookie';
import centerActionType from './actionTypes/centerActionType';
import baseUrl from '../services/baseUrl';

const cookies = new Cookies();
const token = cookies.get('jwt-events-manager');

/**
 *
 */
export default class CenterActions {
  /**
   *@returns {*}
   * this action is handles fetching all centers
   */
  getAll() {
    const request = () => {
      const requestAction = { type: centerActionType.GETALL_REQUEST };
      return requestAction;
    };
    const success = (centers) => {
      const successAction = { type: centerActionType.GETALL_SUCCESS, centers };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.GETALL_FAILED, error };
      return failureAction;
    };
    return (dispatch) => {
      dispatch(request());
      axios({
        method: 'GET',
        url: '/api/v1/centers',
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
   *@returns {*}
   * this action is handles fetching all states
   */
  getAllStates() {
    const request = () => {
      const requestAction = { type: centerActionType.GETSTATES_REQUEST };
      return requestAction;
    };
    const success = (states) => {
      const successAction = { type: centerActionType.GETSTATES_SUCCESS, states };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.GETSTATES_FAILED, error };
      return failureAction;
    };
    return (dispatch) => {
      dispatch(request());
      axios({
        method: 'GET',
        url: '/api/v1/states',
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
   * @param {*} newCenter
   *@returns {*}
   * this action is handles creating a center
   */
  createCenter(newCenter) {
    const request = (center) => {
      const requestAction = { type: centerActionType.CREATE_REQUEST, center };
      return requestAction;
    };
    const success = (center) => {
      const successAction = { type: centerActionType.CREATE_SUCCESS, center };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.CREATE_FAILED, error };
      return failureAction;
    };

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
      dispatch(request(newCenter));
      axios({
        method: 'POST',
        url: '/api/v1/centers',
        headers: {
          'x-access-token': token
        },
        data: formData
      })
        .then((result) => {
          // const { data } = result;
          console.log(result.data);
          dispatch(success(result.data));
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(failure(error.response.data));
        });
    };
  }

  /**
   *
   * @param {*} centerObj
   * @returns {*}
   * this action is handles updating a center
   */
  updateCenter(centerObj) {
    const request = (center) => {
      const requestAction = { type: centerActionType.UPDATE_REQUEST, center };
      return requestAction;
    };
    const success = (center) => {
      const successAction = { type: centerActionType.UPDATE_SUCCESS, center };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.UPDATE_FAILED, error };
      return failureAction;
    };

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
      dispatch(request(centerObj));
      axios({
        method: 'PUT',
        url: `/api/v1/centers/${centerObj.id}`,
        headers: {
          'x-access-token': token
        },
        data: formData
      })
        .then((result) => {
          Materialize.toast(result.data.message, 6000, 'cyan');
          $('#updateCenter').modal('close');
          dispatch(success(result.data));
        })
        .catch((error) => {
          Materialize.toast(error.response.data.message, 4000, 'red');
          dispatch(failure(error.response.data));
        });
    };
  }
  /**
   *
   * @param {*} param
   * @returns {*}
   * this action handles user verification
   */
  search(param) {
    const request = (centers) => {
      const requestAction = { type: centerActionType.SEARCH_REQUEST, centers };
      return requestAction;
    };
    const success = (centers) => {
      const successAction = { type: centerActionType.SEARCH_SUCCESS, centers };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.SEARCH_FAILURE, error };
      return failureAction;
    };
    return (dispatch) => {
      dispatch(request(param));
      axios({
        method: 'POST',
        url: '/api/v1/searchcenter',
        data: param
      })
        .then((response) => {
          console.log(response.data);
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(error.response.data));
        });
    };
  }

  /**
   *
   * @param {*} id
   * @returns {*}
   * this action is handles deleting a center
  */
  deleteCenter(id) {
    const request = (centerId) => {
      const requestAction = { type: centerActionType.DELETE_REQUEST, centerId };
      return requestAction;
    };
    const success = (centerId) => {
      const successAction = { type: centerActionType.DELETE_SUCCESS, centerId };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.DELETE_FAILED, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(id));
      axios({
        method: 'DELETE',
        url: `/api/v1/centers/${id}`,
        headers: {
          'x-access-token': token
        }
      })
        .then((result) => {
          dispatch(success(result.data));
          Materialize.toast(result.data.message, 6000, 'cyan');
          $('#deleteCenter').modal('close');
        })
        .catch((error) => {
          console.log(error.response.data.message);
          dispatch(failure(error.response.data));
          Materialize.toast(error.response.data.message, 6000, 'red');
        });
    };
  }
}
