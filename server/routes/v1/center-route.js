import express from 'express';
import CenterController from '../../controllers/v1/center-controller';
import Security from '../../middlewares/security';

const centersRouterV1 = express.Router();

centersRouterV1.post('/centers', Security.check, CenterController.create);
centersRouterV1.get('/centers', CenterController.getAll);
centersRouterV1.get('/centers/:centerId', CenterController.get);
centersRouterV1.get('/states', CenterController.getAllStates);
centersRouterV1.put('/centers/:centerId', Security.check, CenterController.update);
centersRouterV1.delete('/centers/:centerId', Security.check, CenterController.delete);

export default centersRouterV1;
