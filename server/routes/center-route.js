import express from 'express';
import CenterController from '../controllers/center-controller';


const centerRoutes = (app) => {
  app.post('/centers', CenterController.create);
  app.get('/centers', CenterController.getAll);
  app.get('/centers/:centerId', CenterController.get);
  app.put('/centers/:centerId', CenterController.update);
  app.delete('/centers/:centerId', CenterController.delete);
};
export default centerRoutes;
