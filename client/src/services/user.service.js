import axios from 'axios';


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
    return axios.post('/api/v1/users', newUser);
  }

  /**
   *
   * @param {*} user
   * @returns {*}
   * this service handles user authentication
   */
  static authenticateUser(user) {
    return axios.post('/api/v1/users/login', user);
  }

  /**
   *
   * @param {*} token
   * @returns {*}
   * this service handles user verification
   */
  static completeRegistration(token) {
    return axios.get(`/api/v1/users/completeRegistration?token=${token}`);
  }
}

export default UserService;

