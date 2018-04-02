import CenterController from '../controllers/center-controller';
import Security from '../middlewares/security';

const centerRoutes = (app) => {
  app.post('/api/v1/centers', Security.check, CenterController.create);
  app.post('/api/v1/searchcenter', CenterController.searchCenters);
  app.get('/api/v1/centers', CenterController.getAll);
  app.get('/api/v1/centers/:centerId', Security.check, CenterController.get);
  app.get('/api/v1/states', CenterController.getAllStates);
  app.put('/api/v1/centers/:centerId', Security.check, CenterController.update);
  app.delete('/api/v1/centers/:centerId', Security.check, CenterController.delete);
};
export default centerRoutes;
