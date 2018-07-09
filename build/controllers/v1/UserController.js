'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _Mailer = require('../../services/Mailer');

var _Mailer2 = _interopRequireDefault(_Mailer);

var _mailTemplate = require('../../config/mailTemplate');

var mailTemplate = _interopRequireWildcard(_mailTemplate);

var _Pagination = require('../../services/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.load();
var Users = _models2.default.User;

var mailer = new _Mailer2.default();

/**
 * @exports
 *
 * @class
 *
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'handleUserInsert',

    /**
     * @memberOf UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     *
     * @return {json} returns ststus and message
     */
    value: function handleUserInsert(req, res) {
      Users.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.hashedPassword
      }).then(function (user) {
        var host = req.protocol + '://' + req.get('host');
        var token = _jsonwebtoken2.default.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
        var message = mailTemplate.messageBody.accountCreated(user.username, token, host);
        mailer.sendMail(user.email, message, 'Welcome to EventsManager');
        var userDetails = {
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified
        };
        return res.status(201).json({
          message: 'User registration successfull. An email has been sent for verification',
          userDetails: userDetails,
          token: token,
          statusCode: 201
        });
      });
    }
    /**
     * @memberOf UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @param {function} next - call the next function
     *
     * @return {json} returns ststus and message
     */

  }, {
    key: 'validateNewUser',
    value: function validateNewUser(req, res, next) {
      var Op = _sequelize2.default.Op;

      return Users.findAll({
        where: _defineProperty({}, Op.or, [{ email: req.body.email }, { username: req.body.username }])
      }).then(function (users) {
        if (users.length > 0) {
          res.status(409).json({ message: 'email or username already taken', statusCode: 409 });
        } else if (req.body.password !== req.body.confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match', statusCode: 400 });
        } else {
          req.body.hashedPassword = _bcrypt2.default.hashSync(req.body.password, 10);
          next();
        }
      });
    }

    /**
     *
     * @memberof UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @return {json} returns user object of authnticated user
     */

  }, {
    key: 'authenticate',
    value: function authenticate(req, res) {
      return Users.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (user) {
        if (!user) {
          return res.status(401).json({ message: 'Invalid Login Credentials', statusCode: 401 });
        }
        if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
          return res.status(401).json({ message: 'Invalid Login Credentials', statusCode: 401 });
        }
        if (!user.isVerified) {
          return res.status(401).json({
            message: 'Registration incomplete. Proceed to your mail to complete registration',
            statusCode: 401
          });
        }
        var token = _jsonwebtoken2.default.sign({
          id: user.id,
          isAdmin: user.isAdmin,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified
        }, process.env.SECRET_KEY, { expiresIn: '1d' });

        var userDetails = {
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified
        };

        res.status(200).json({
          message: 'Authentication Is Successful!',
          userDetails: userDetails,
          Token: token,
          statusCode: 200
        });
      });
    }

    /**
     * @memberof UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {object} complete user registration
     */

  }, {
    key: 'completeRegistration',
    value: function completeRegistration(req, res) {
      return Users.findOne({
        where: {
          email: req.decoded.email
        }
      }).then(function (user) {
        if (user.isVerified === true) {
          return res.status(409).json({ message: 'User is already verified', statusCode: 409 });
        }
        return user.update({
          isVerified: true
        }).then(function () {
          return res.status(200).json({
            message: 'Welcome to Event Manager',
            statusCode: 200
          });
        });
      }).catch(function (err) {
        return res.status(500).json({
          message: 'Oops!, an error has occured',
          error: err.name,
          statusCode: 500
        });
      });
    }

    /**
     *
     * @memberOf UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {json} returns all users
     */

  }, {
    key: 'getUsers',
    value: function getUsers(req, res) {
      return Users.findAndCountAll({
        attributes: ['id', 'username', 'email', 'isAdmin', 'isVerified'],
        limit: req.meta.limit,
        offset: req.meta.offset
      }).then(function (users) {
        if (users.rows < 1) {
          res.status(400).json({
            message: 'No Users Found',
            data: null,
            meta: null,
            statusCode: 400
          });
        }
        res.status(200).json({
          message: 'Users Retrieved',
          data: users.rows,
          metaData: {
            pagination: _Pagination2.default.createPagingData(users, req.meta)
          },
          statusCode: 200
        });
      });
    }

    /**
     *
     * @memberOf UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {json} returns message object id deletion is successful
     */

  }, {
    key: 'delete',
    value: function _delete(req, res) {
      return Users.findById(req.params.userId).then(function (user) {
        if (!user) {
          return res.status(404).json({
            message: 'User does not exist',
            statusCode: 404
          });
        }
        user.destroy().then(function () {
          return res.status(200).json({ message: 'User is successfully  deleted', statusCode: 200 });
        });
      });
    }

    /**
     *
     * @memberOf UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {json} returns message object id deletion is successful
     */

  }, {
    key: 'resetPasswordRequest',
    value: function resetPasswordRequest(req, res) {
      var host = req.protocol + '://' + req.get('host');
      return Users.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (user) {
        if (user) {
          var token = _jsonwebtoken2.default.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });
          var message = mailTemplate.messageBody.resetPassword(user.username, token, host);
          mailer.sendMail(user.email, message, 'Password Reset Link');
          return res.status(200).json({ message: 'Password reset link is sent', statusCode: 200, token: token });
        }
        return res.status(404).json({ message: 'User does not exist', statusCode: 404 });
      });
    }

    /**
     * @memberOf UserController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {json} returns message object with status code
     */

  }, {
    key: 'resetPassword',
    value: function resetPassword(req, res) {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match', statusCode: 400 });
      }
      return Users.findOne({
        where: {
          email: req.decoded.email
        }
      }).then(function (user) {
        return user.update({ password: _bcrypt2.default.hashSync(req.body.password, 10) }).then(function () {
          res.status(200).json({ message: 'Password reset successful. You can proceed to Login', statusCode: 200 });
        }).catch(function (err) {
          return res.status(500).json({ message: 'Oops!, an error has occured', error: err.name, statusCode: 500 });
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;
//# sourceMappingURL=UserController.js.map