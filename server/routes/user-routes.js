import UserController from '../controllers/user-controller';
import Security from '../middlewares/security';

const userRoutes = (app) => {
  app.post('/api/v1/users', UserController.create);
  app.post('/api/v1/users/login', UserController.authenticate);
  app.post('/api/v1/users/reset', UserController.resetPasswordRequest);
  app.post('/api/v1/users/password', Security.check, UserController.resetPassword);
  app.get('/api/v1/users/completeRegistration', Security.check, UserController.completeRegistration);
  app.delete('/api/v1/users/:userId', Security.check, UserController.delete);
  app.get('/api/v1/users', UserController.getUsers);
};

export default userRoutes;

