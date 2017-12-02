import express from 'express';
import UserController from '../controllers/user-controller';

const userRoutes = (app) => {
  app.post('/api/v1/users', UserController.create);
  app.post('/api/v1/users/login', UserController.authenticate);
  app.get('/api/v1/users', UserController.getUsers);
};

export default userRoutes;

