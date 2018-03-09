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

  /**
   *
   * @param {*} user
   * @returns {*}
   * this action handles user authentication
   */
  static login(user) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.SIGNIN_REQUEST, user));
      axios.post('/api/v1/users/login', user)
        .then((response) => {
          dispatch(Dispatcher.action(userActionsType.SIGNIN_SUCCESS, response.data.userDetails));
          cookies.set('jwt-events-manager', response.data.Token, { path: '/' });
          history.push('/center-search');
        })
        .catch((error) => {
          const err = error.response.data.message;
          dispatch(Dispatcher.action(userActionsType.SIGNIN_FAILURE, err));
          Toast.error(err);
        });
    };
  }

  /**
   *
   * @param {*} email
   * @returns {*}
   * this action handles reset password reset
   */
  static resetRequest(email) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.RESET_REQUEST, email));
      axios.post('/api/v1/users/reset', email)
        .then((response) => {
          Logger.log(response);
          const { message } = response.data;
          dispatch(Dispatcher.action(userActionsType.RESET_SUCCESS, message));
          Toast.success(message);
        })
        .catch((error) => {
          Logger.log(error.response);
          const err = error.response.data.message;
          dispatch(Dispatcher.action(userActionsType.SIGNIN_FAILURE, err));
        });
    };
  }

  /**
   *
   * @param {*} password
   * @returns {*}
   * this action handles password reset
   */
  static resetPassword(password) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.RESET_REQUEST, password));
      axios.post(`/api/v1/users/password?token=${password.token}`, password)
        .then((response) => {
          Logger.log(response);
          const { message } = response.data;
          dispatch(Dispatcher.action(userActionsType.RESET_SUCCESS, message));
          Toast.success(message);
          setTimeout(() => { history.push('/login'); }, 5000);
        })
        .catch((error) => {
          const err = error.response.data.message;
          dispatch(Dispatcher.action(userActionsType.RESET_FAILURE, err));
          Toast.error(err);
        });
    };
  }

  /**
   *
   * @returns {*}
   * this action handles password reset
   */
  static logout() {
    cookies.remove('jwt-events-manager');
    document.location.href = '/login';
  }
}
