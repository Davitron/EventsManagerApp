import express from 'express';
import UserController from '../controllers/user-controller';

const userRoutes = (app) => {
  app.post('/users', UserController.create);
  app.post('/users/login', UserController.authenticate);
  app.get('/users', UserController.getUsers);
};

export default userRoutes;

