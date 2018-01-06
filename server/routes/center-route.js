import express from 'express';
import multipart from 'connect-multiparty';
import path from 'path';
import CenterController from '../controllers/center-controller';
import Security from '../middlewares/security';

const uploadPath = path.resolve(__dirname, '../public/uploads');

const mutipartMiddleware = multipart({ uploadDir: uploadPath });

const centerRoutes = (app) => {
  app.post('/api/v1/centers', Security.check, mutipartMiddleware, CenterController.create);
  app.get('/api/v1/centers', CenterController.getAll);
  app.get('/api/v1/centers/:centerId', Security.check, CenterController.get);
  app.get('/api/v1/states', CenterController.getAllStates);
  app.put('/api/v1/centers/:centerId', Security.check, CenterController.update);
  app.delete('/api/v1/centers/:centerId', Security.check, CenterController.delete);
};
export default centerRoutes;
