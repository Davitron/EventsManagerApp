import jwt from 'jsonwebtoken';
import model from '../models';

const Users = model.User;
/**
 *
 */
export default class Security {
  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP request object
   * @param {function} next - To call the next rout function
   * @returns {object|next} moves to callback function if token is provided
   * or send an error message if otherwise
   *
   */
  static check(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, resolved) => {
        if (err) {
          return res.status(403).json({ message: 'Token is invalid or expired', statusCode: 403 });
        }
        Users.findOne({
          where: {
            id: resolved.id
          }
        })
          .then((user) => {
            if (user) {
              req.decoded = resolved;
              return next();
            }
            return res.status(404).json({ message: 'User Not Found', statusCode: 404 });
          });
      });
    } else {
      return res.status(403).json({ message: 'No Token Was Provided', statusCode: 403 });
    }
  }
}
