import axios from 'axios';
import Cookies from 'universal-cookie';
import centerActionType from './actionTypes/centerActionType';
import baseUrl from '../services/baseUrl';

const cookies = new Cookies();

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
      const token = cookies.get('jwt-events-manager');
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
          dispatch(failure(error.response.data));
        });
    };
  }
}
