import express from 'express';
import UserController from '../../controllers/v1/user-controller';
import Security from '../../middlewares/security';

const userRouterV1 = express.Router();

userRouterV1.post('/users', UserController.create);
userRouterV1.post('/users/login', UserController.authenticate);
userRouterV1.post('/users/reset', UserController.resetPasswordRequest);
userRouterV1.post('/users/password', Security.check, UserController.resetPassword);
userRouterV1.get('/users/completeRegistration', Security.check, UserController.completeRegistration);
userRouterV1.delete('/users/:userId', Security.check, UserController.delete);
userRouterV1.get('/users', UserController.getUsers);

export default userRouterV1;
