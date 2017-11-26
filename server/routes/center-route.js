import express from 'express';
import CenterController from '../controllers/center-controller';


const centerRoutes = (app) => {
  app.post('/api/v1/centers', CenterController.create);
  app.get('/api/v1/centers', CenterController.getAll);
  app.get('/api/v1/centers/:centerId', CenterController.get);
  app.put('/api/v1/centers/:centerId', CenterController.update);
  app.delete('/api/v1/centers/:centerId', CenterController.delete);
};
export default centerRoutes;
