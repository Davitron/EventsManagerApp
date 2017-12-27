import axios from 'axios';
import cookie from 'react-cookies';
import baseUrl from './baseUrl';
/**
 * this class handles services necessarry for user authentication and registration
 */
class UserService {
  /**
   *
   * @param {*} newUser
   * @returns {*}
   * this service handles user registration
   */
  static createUser(newUser) {
    return axios.post(`${baseUrl}/users`, newUser);
  }

  /**
   *
   * @param {*} user
   * @returns {*}
   * this service handles user authentication
   */
  static authenticateUser(user) {
    return axios.post(`${baseUrl}/users/login`, user);
  }

  /**
   *
   * @param {*} token
   * @returns {*}
   * this service handles user verification
   */
  static completeRegistration(token) {
    return axios.get(`${baseUrl}/users/completeRegistration?token=${token}`);
  }
}

export default UserService;

