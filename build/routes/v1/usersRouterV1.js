'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('../../controllers/v1/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _Security = require('../../middlewares/Security');

var _Security2 = _interopRequireDefault(_Security);

var _RequestSanitizer = require('../../middlewares/RequestSanitizer');

var _RequestSanitizer2 = _interopRequireDefault(_RequestSanitizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersRouterV1 = _express2.default.Router();

usersRouterV1.post('/users', _RequestSanitizer2.default.newUserPreValidation, _RequestSanitizer2.default.handleValidation, _UserController2.default.validateNewUser, _UserController2.default.handleUserInsert);

usersRouterV1.get('/users', _RequestSanitizer2.default.sanitizeQuery, _RequestSanitizer2.default.prepareGetAllRequest, _UserController2.default.getUsers);

usersRouterV1.post('/users/login', _RequestSanitizer2.default.authUserPreValidation, _RequestSanitizer2.default.handleValidation, _UserController2.default.authenticate);

usersRouterV1.post('/users/reset', _RequestSanitizer2.default.resetRequestPreValidation, _RequestSanitizer2.default.handleValidation, _UserController2.default.resetPasswordRequest);

usersRouterV1.post('/users/password', _Security2.default.check, _RequestSanitizer2.default.passwordRequestPreValidation, _RequestSanitizer2.default.handleValidation, _UserController2.default.resetPassword);

usersRouterV1.get('/users/completeRegistration', _Security2.default.check, _UserController2.default.completeRegistration);

usersRouterV1.delete('/users/:userId', _Security2.default.check, _RequestSanitizer2.default.checkIfAdmin, _RequestSanitizer2.default.validateParameters, _Security2.default.check, _UserController2.default.delete);

exports.default = usersRouterV1;
//# sourceMappingURL=usersRouterV1.js.map