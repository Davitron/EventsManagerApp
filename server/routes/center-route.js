import express from 'express';
import CenterController from '../controllers/center-controller';
import Security from '../middlewares/security';


const centerRoutes = (app) => {
  app.post('/api/v1/centers', Security.check, CenterController.create);
  app.get('/api/v1/centers', Security.check, CenterController.getAll);
  app.get('/api/v1/centers/:centerId', Security.check, Security.check, CenterController.get);
  app.put('/api/v1/centers/:centerId', Security.check, CenterController.update);
  app.delete('/api/v1/centers/:centerId', Security.check, CenterController.delete);
};
export default centerRoutes;
