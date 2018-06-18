import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

/**
 * @class
 *
 */
class AuthChecker {
  /**
   * @returns {boolean|null}
   * Check role of user and return null if user doesn't exist
   */
  static defineRole() {
    const cookies = new Cookies();
    const token = cookies.get('jwt-events-manager');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.isAdmin === true) {
        return 'admin';
      }
      return 'user';
    }
    return null;
  }
  /**
   *@returns {boolean}
   * checks if user is authenticated and email is verified
   */
  static checkUserAuth() {
    const cookies = new Cookies();
    const token = cookies.get('jwt-events-manager');
    if (token) {
      const decoded = jwtDecode(token);
      const expiryDate = new Date(0);
      expiryDate.setUTCSeconds(decoded.exp);
      if (expiryDate > Date.now() && decoded.isVerified === true) {
        return true;
      }
      return false;
    }
    return null;
  }
}

export default AuthChecker;
