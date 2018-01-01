import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

/**
 *
 */
class AuthChecker {
  /**
   *@returns {boolean}
   * checks if user is authenticated and email is verified
   */
  static checkUserAuth() {
    let result = false;
    const cookies = new Cookies();
    const token = cookies.get('jwt-events-manager');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp > Date.now() && decoded.isVerified === true) {
        result = true;
      }
    }
    return result;
  }

  /**
   *@returns {boolean}
   * checks if user is admin and authenticated
   * also if email is verified
   */
  static checkAdminAuth() {
    let result = false;
    const cookies = new Cookies();
    const token = cookies.get('jwt-events-manager');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp > Date.now() && decoded.isVerified === true && decoded.isAdmin === true) {
        result = true;
      }
    }
    return result;
  }
}

export default AuthChecker;
