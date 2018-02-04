import Cookies from 'universal-cookie';
import axios from 'axios';
import userActionsType from './actionTypes/user-action-types';
import history from '../helpers/history';
import Dispatcher from '../helpers/dispatch';
import Logger from '../helpers/logger';
import Toast from '../helpers/toast';

const cookies = new Cookies();

/**
 * This action handles user authentication, registration, email verification,
 * and password reset
 */
export default class UserActions {
  /**
   *
   * @param {*} data
   * @returns {*}
   * A static method for handling user registration
   */
  static register(data) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.SIGNUP_REQUEST, data));
      axios.post('/api/v1/users', data)
        .then((response) => {
          dispatch(Dispatcher.action(userActionsType.SIGNUP_SUCCESS, response.data.message));
          history.push('/verify', {
            state: { message: response.data.message }
          });
        })
        .catch((error) => {
          const { message } = error.response.data;
          Toast.error(message);
          dispatch(Dispatcher.action(userActionsType.SIGNUP_FAILURE, message));
        });
    };
  }

  /**
   *
   * @param {*} token
   * @returns {*}
   * this action handles user verification
   */
  static completeRegistration(token) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.VERIFY_REQUEST, token));
      axios.get(`/api/v1/users/completeRegistration?token=${token}`)
        .then((response) => {
          dispatch(Dispatcher.action(userActionsType.VERIFY_SUCCESS, response.data.message));
          cookies.set('jwt-events-manager', response.data.Token, { path: '/' });
        })
        .catch((error) => {
          Logger.log(error.response);
          if (error.response.status === 403) {
            const message = 'Token Expired';
            dispatch(Dispatcher.action(userActionsType.VERIFY_FAILURE, message));
          } else {
            dispatch(Dispatcher.action(userActionsType.VERIFY_FAILURE, error.response.data.message));
          }
        });
    };
  }
}
