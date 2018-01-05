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
        url: `${baseUrl}/centers`,
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
        url: `${baseUrl}/states`,
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
      const requestAction = { type: centerActionType.GETSTATES_REQUEST, center };
      return requestAction;
    };
    const success = (center) => {
      const successAction = { type: centerActionType.GETSTATES_SUCCESS, center };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: centerActionType.GETSTATES_FAILED, error };
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
        url: `${baseUrl}/centers`,
        headers: {
          'x-access-token': token
        },
        data: formData
      })
        .then((result) => {
          dispatch(success(result.data));
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(failure(error.response.data));
        });
    };
  }
}
