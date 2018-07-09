'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _validatonRules = require('./validatonRules');

var _validatonRules2 = _interopRequireDefault(_validatonRules);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 */
var RequestSanitizer = function () {
  function RequestSanitizer() {
    _classCallCheck(this, RequestSanitizer);
  }

  _createClass(RequestSanitizer, null, [{
    key: 'checkIfAdmin',

    /**
     * Check user role
     * @param {object} req - HTTP request object
     * @param {object} res - HTTP response object
     * @param {function} next - call next function
     * @returns {object|next}
     * moves to the next function if the user is an admin
     * returns if an error occurs
     */
    value: function checkIfAdmin(req, res, next) {
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

  }, {
    key: 'handleValidation',
    value: function handleValidation(req, res, next) {
      // temporary hack for swagger bug
      if (req.body.facilities && !Array.isArray(req.body.facilities)) {
        req.body.facilities = req.body.facilities.split(',');
      }
      var validation = new _validatorjs2.default(req.body, req.validatonRule);
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

  }, {
    key: 'validateRouteQuery',
    value: function validateRouteQuery(param) {
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

  }, {
    key: 'validateParameters',
    value: function validateParameters(req, res, next) {
      var key = Object.keys(req.params)[0];
      var id = req.params[key];
      var name = key;
      if (id && isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ' + name, statusCode: 400 });
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

  }, {
    key: 'sanitizeQuery',
    value: function sanitizeQuery(req, res, next) {
      for (var key in req.query) {
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

  }, {
    key: 'prepareGetAllRequest',
    value: function prepareGetAllRequest(req, res, next) {
      var limit = parseInt(req.query.limit, 10) || 12;
      var offset = 0;
      var page = parseInt(req.query.page, 10) || 1;
      offset = limit * (page - 1);

      var reqMeta = {
        baseUrl: req.protocol + '://' + req.get('host') + req.baseUrl + req.path,
        qString: _queryString2.default.stringify(req.query) || _queryString2.default.stringify({ limit: limit, page: page }),
        limit: limit,
        page: page,
        offset: offset,
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

  }, {
    key: 'newCenterPreValidation',
    value: function newCenterPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.newCenter;
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

  }, {
    key: 'updateCenterPreValidation',
    value: function updateCenterPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.updateCenter;
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

  }, {
    key: 'newEventPreValidation',
    value: function newEventPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.newEvent;
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

  }, {
    key: 'updateEventPreValidation',
    value: function updateEventPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.updateEvent;
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

  }, {
    key: 'eventStatusPreValidation',
    value: function eventStatusPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.eventNewStatus;
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

  }, {
    key: 'newUserPreValidation',
    value: function newUserPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.newUser;
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

  }, {
    key: 'authUserPreValidation',
    value: function authUserPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.authUser;
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

  }, {
    key: 'resetRequestPreValidation',
    value: function resetRequestPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.resetPasswordRequest;
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

  }, {
    key: 'passwordRequestPreValidation',
    value: function passwordRequestPreValidation(req, res, next) {
      req.validatonRule = _validatonRules2.default.passwordReset;
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

  }, {
    key: 'completeCenterAddress',
    value: function completeCenterAddress(req, res, next) {
      var States = _models2.default.State;

      var address = req.body.address || req.currentCenter.address;
      var stateId = req.body.stateId || req.currentCenter.stateId;

      var setFullAddress = function setFullAddress(_address, stateName) {
        return _address + ', ' + stateName;
      };
      States.findOne({ where: { id: stateId } }).then(function (state) {
        req.body.fullAddress = setFullAddress(address, state.stateName);
        next();
      });
    }
  }]);

  return RequestSanitizer;
}();

exports.default = RequestSanitizer;
//# sourceMappingURL=RequestSanitizer.js.map