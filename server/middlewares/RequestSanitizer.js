import validator from 'validatorjs';
import queryString from 'query-string';
import validatonRules from './validatonRules';
import model from '../models';

/**
 * @class
 */
class RequestSanitizer {
  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {object|next}
   * moves to the next function if the user is an admin
   * returns if an error occurs
   */
  static checkIfAdmin(req, res, next) {
    if (req.decoded.isAdmin) {
      next();
    } else {
      return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
    }
  }

  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {object|next}
   * moves to the next function if the user is an admin
   * returns if an error occurs
   */
  static handleValidation(req, res, next) {
    // temporary hack for swagger bug
    if (req.body.facilities && !Array.isArray(req.body.facilities)) {
      req.body.facilities = req.body.facilities.split(',');
    }
    const validation = new validator(req.body, req.validatonRule);
    if (validation.passes()) {
      next();
    } else {
      return res.status(400).json({ message: validation.errors, statusCode: 400 });
    }
  }

  /**
   *
   * @param {number} param
   * @returns {boolean} to determine id param id is valid
   */
  static validateRouteQuery(param) {
    if (param && (isNaN(param) || param < 0)) {
      return false;
    }
    return true;
  }

  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {object|next}
   * to validate req.params
   */
  static validateParameters(req, res, next) {
    const key = Object.keys(req.params)[0];
    const id = req.params[key];
    const name = key;
    if (id && isNaN(id)) {
      return res.status(400).json({ message: `Invalid ${name}`, statusCode: 400 });
    }
    next();
  }


  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {object|next}
   * moves to the next function if the user is an admin
   * returns if an error occurs
   */
  static sanitizeQuery(req, res, next) {
    for (const key in req.query) {
      if (key === 'state' || key === 'capacity') {
        if (isNaN(req.query[key]) || req.query[key] < 0) {
          return res.status(400).json({ message: 'Invalid Request', statusCode: 400 });
        }
      }
    }
    next();
  }

  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {object|next}
   * moves to the next function if the user is an admin
   * returns if an error occurs
   */
  static prepareGetAllRequest(req, res, next) {
    const limit = parseInt(req.query.limit, 10) || 9;
    let offset = 0;
    const page = parseInt(req.query.page, 10) || 1;
    offset = limit * (page - 1);

    const reqMeta = {
      baseUrl: `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`,
      qString: queryString.stringify(req.query) || queryString.stringify({ limit, page }),
      limit,
      page,
      offset,
      DBQuery: {}
    };
    req.meta = reqMeta;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static newCenterPreValidation(req, res, next) {
    req.validatonRule = validatonRules.newCenter;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static updateCenterPreValidation(req, res, next) {
    req.validatonRule = validatonRules.updateCenter;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static newEventPreValidation(req, res, next) {
    req.validatonRule = validatonRules.newEvent;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static updateEventPreValidation(req, res, next) {
    req.validatonRule = validatonRules.updateEvent;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static eventStatusPreValidation(req, res, next) {
    req.validatonRule = validatonRules.eventNewStatus;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static newUserPreValidation(req, res, next) {
    req.validatonRule = validatonRules.newUser;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static authUserPreValidation(req, res, next) {
    req.validatonRule = validatonRules.authUser;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static resetRequestPreValidation(req, res, next) {
    req.validatonRule = validatonRules.resetPasswordRequest;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static passwordRequestPreValidation(req, res, next) {
    req.validatonRule = validatonRules.passwordReset;
    next();
  }

  /**
   * Check user role
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {void}
   * append the validation rule to request object
   *
   */
  static completeCenterAddress(req, res, next) {
    const States = model.State;

    const address = req.body.address || req.currentCenter.address;
    const stateId = req.body.stateId || req.currentCenter.stateId;

    const setFullAddress = (_address, stateName) => `${_address}, ${stateName}`;
    States.findOne({ where: { id: stateId } })
      .then((state) => {
        req.body.fullAddress = setFullAddress(address, state.stateName);
        next();
      });
  }
}

export default RequestSanitizer;
