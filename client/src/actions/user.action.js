import Cookies from 'universal-cookie';
import userActionsType from './actionTypes/userAtionType';
import UserService from '../services/user.service';
import history from '../helpers/history';

const cookies = new Cookies();

/**
 *
 */
export default class UserActions {
/**
 *
 * @param {*} newUser
 * @returns {*}
 * this action is for user registration
 */
  signUp(newUser) {
    const request = (user) => {
      const requestAction = { type: userActionsType.SIGNUP_REQUEST, user };
      return requestAction;
    };
    const success = (message) => {
      const successAction = { type: userActionsType.SIGNUP_SUCCESS, message };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: userActionsType.SIGNUP_FAILURE, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(newUser));

      UserService.createUser(newUser)
        .then((result) => {
          dispatch(success(result.data.message));
          history.push('/users/verify');
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(failure(error.response.data));
        });
    };
  }

  /**
   *
   * @param {*} thisUser
   * @returns {*}
   *this action handles user authentication
   */
  signin(thisUser) {
    const request = (user) => {
      const requestAction = { type: userActionsType.SIGNIN_REQUEST, user };
      return requestAction;
    };
    const success = (user) => {
      const successAction = { type: userActionsType.SIGNIN_SUCCESS, user };
      return successAction;
    };
    const failure = (error) => {
      const failureAction = { type: userActionsType.SIGNIN_FAILURE, error };
      return failureAction;
    };

    return (dispatch) => {
      dispatch(request(thisUser));

      UserService.authenticateUser(thisUser)
        .then((result) => {
          dispatch(success(result.data.userDetails));
          cookies.set('jwt-events-manager', result.data.Token, { path: '/' });
          history.push('/');
          // console.log(result);
        })
        .catch((error) => {
          dispatch(failure(error.response));
        });
    };
  }

  /**
   *@returns {*}
   *this action handles user logout
   */
  signout() {

  }
}
