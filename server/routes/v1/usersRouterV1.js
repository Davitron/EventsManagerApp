import express from 'express';
import UserController from '../../controllers/v1/UserController';
import Security from '../../middlewares/Security';
import RequestSanitizer from '../../middlewares/RequestSanitizer';

const usersRouterV1 = express.Router();

usersRouterV1.post(
  '/users',
  RequestSanitizer.newUserPreValidation,
  RequestSanitizer.handleValidation,
  UserController.validateNewUser,
  UserController.handleUserInsert
);

usersRouterV1.get(
  '/users',
  RequestSanitizer.sanitizeQuery,
  RequestSanitizer.prepareGetAllRequest,
  UserController.getUsers
);

usersRouterV1.post(
  '/users/login',
  RequestSanitizer.authUserPreValidation,
  RequestSanitizer.handleValidation,
  UserController.authenticate
);

usersRouterV1.post(
  '/users/reset',
  RequestSanitizer.resetRequestPreValidation,
  RequestSanitizer.handleValidation,
  UserController.resetPasswordRequest
);

usersRouterV1.post(
  '/users/password',
  Security.check,
  RequestSanitizer.passwordRequestPreValidation,
  RequestSanitizer.handleValidation,
  UserController.resetPassword
);

usersRouterV1.get(
  '/users/completeRegistration',
  Security.check,
  UserController.completeRegistration
);

usersRouterV1.delete(
  '/users/:userId',
  Security.check,
  RequestSanitizer.checkIfAdmin,
  RequestSanitizer.validateParameters,
  Security.check, UserController.delete
);

export default usersRouterV1;
