'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.User;
/**
 *
 */

var Security = function () {
  function Security() {
    _classCallCheck(this, Security);
  }

  _createClass(Security, null, [{
    key: 'check',

    /**
     *
     * @param {object} req - HTTP request object
     * @param {object} res - HTTP request object
     * @param {function} next - To call the next rout function
     * @returns {object|next} moves to callback function if token is provided
     * or send an error message if otherwise
     *
     */
    value: function check(req, res, next) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, resolved) {
          if (err) {
            return res.status(403).json({ message: 'Token is invalid or expired', statusCode: 403 });
          }
          Users.findOne({
            where: {
              id: resolved.id
            }
          }).then(function (user) {
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
  }]);

  return Security;
}();

exports.default = Security;
//# sourceMappingURL=Security.js.map