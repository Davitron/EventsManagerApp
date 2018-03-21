import jwt from 'jsonwebtoken';
/**
 *
 */
export default class Security {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} moves to callback function if token is provided
   * or send an error message if otherwise
   *
   */
  static check(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, resolved) => {
        if (err) {
          return res.status(403).json({ message: 'Token is invalid or expired' });
        }
        req.decoded = resolved;
        return next();
      });
    } else {
      return res.status(403).json({ message: 'No Token Was Provided' });
    }
  }
}
