import express from 'express';
import UserController from '../../controllers/v1/user-controller';
import Security from '../../middlewares/security';
import ValidateRequest from '../../middlewares/request-validation';

const userRouterV1 = express.Router();

userRouterV1.post(
  '/users',
  ValidateRequest.newUserPreValidation,
  ValidateRequest.handleValidation,
  UserController.validateNewUser,
  UserController.handleUserInsert
);

userRouterV1.get(
  '/users',
  ValidateRequest.sanitizeQuery,
  ValidateRequest.prepareGetAllRequest,
  UserController.getUsers
);

userRouterV1.post(
  '/users/login',
  ValidateRequest.authUserPreValidation,
  ValidateRequest.handleValidation,
  UserController.authenticate
);

userRouterV1.post(
  '/users/reset',
  ValidateRequest.resetRequestPreValidation,
  ValidateRequest.handleValidation,
  UserController.resetPasswordRequest
);

userRouterV1.post(
  '/users/password',
  Security.check,
  ValidateRequest.passwordRequestPreValidation,
  ValidateRequest.handleValidation,
  UserController.resetPassword
);

userRouterV1.get(
  '/users/completeRegistration',
  Security.check,
  UserController.completeRegistration
);
userRouterV1.delete(
  '/users/:userId',
  Security.check,
  ValidateRequest.checkIfAdmin,
  ValidateRequest.validateParameters,
  Security.check, UserController.delete
);

export default userRouterV1;
