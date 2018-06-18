import Cookies from 'universal-cookie';
import axios from 'axios';
import userActionsType from './actionTypes/userActionType';
import Dispatcher from '../helpers/dispatch';
import Toast from '../helpers/toast';


const cookies = new Cookies();

/**
 * This action handles user authentication, registration, email verification,
 * and password reset
 */
export default class UserActions {
  /**
   *
   * @param {object} data
   * @returns {void}
   * A static method for handling user registration
   */
  static register(data) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.SIGNUP_REQUEST, data));
      return axios.post('/api/v1/users', data)
        .then((res) => {
          dispatch(Dispatcher.action(userActionsType.SIGNUP_SUCCESS, res.data.message));
        })
        .catch((error) => {
          const { message } = error.response.data;
          dispatch(Dispatcher.action(userActionsType.SIGNUP_FAILURE, message));
        });
    };
  }
  /**
   *
   * @param {string} token
   *
   * @returns {void}
   *
   * this action handles user verification
   */
  static completeRegistration(token) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.VERIFY_REQUEST, token));
      return axios.get(`/api/v1/users/completeRegistration?token=${token}`)
        .then((response) => {
          dispatch(Dispatcher.action(userActionsType.VERIFY_SUCCESS, response.data.message));
        })
        .catch((error) => {
          if (error.response.status === 403) {
            const message = 'Token Expired';
            dispatch(Dispatcher.action(userActionsType.VERIFY_FAILURE, message));
          } else {
            const { message } = error.response.data;
            dispatch(Dispatcher.action(userActionsType.VERIFY_FAILURE, message));
          }
        });
    };
  }

  /**
   *
   * @param {object} user
   *
   * @returns {void}
   *
   * this action handles user authentication
   */
  static login(user) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.SIGNIN_REQUEST, user));
      return axios.post('/api/v1/users/login', user)
        .then((response) => {
          dispatch(Dispatcher.action(userActionsType.SIGNIN_SUCCESS, response.data.userDetails));
          cookies.set('jwt-events-manager', response.data.Token, { path: '/' });
        })
        .catch((error) => {
          const { message } = error.response.data;
          dispatch(Dispatcher.action(userActionsType.SIGNIN_FAILURE, message));
        });
    };
  }

  /**
   *
   * @param {string} email
   *
   * @returns {void}
   *
   * this action handles reset password reset
   */
  static resetRequest(email) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.FORGOT_PASSWORD_REQUEST, email));
      return axios.post('/api/v1/users/reset', email)
        .then((response) => {
          const { message } = response.data;
          dispatch(Dispatcher.action(userActionsType.FORGOT_PASSWORD_SUCCESS, message));
        })
        .catch((error) => {
          const err = error.response.data.message;
          dispatch(Dispatcher.action(userActionsType.FORGET_PASSWORD_FAILURE, err));
        });
    };
  }

  /**
   *
   * @param {string} password
   *
   * @returns {void}
   *
   * this action handles password reset
   */
  static resetPassword(password) {
    return (dispatch) => {
      dispatch(Dispatcher.action(userActionsType.RESET_REQUEST, password));
      return axios.post(`/api/v1/users/password?token=${password.token}`, password)
        .then((response) => {
          const { message } = response.data;
          dispatch(Dispatcher.action(userActionsType.RESET_SUCCESS, message));
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
   * @returns {void}
   *
   * this action handles password reset
   */
  static logout() {
    return (dispatch) => {
      cookies.remove('jwt-events-manager');
      localStorage.removeItem('app');
      dispatch(Dispatcher.action(userActionsType.SIGNOUT, null));
    };
  }
}
