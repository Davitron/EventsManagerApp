import centersRouterV1 from './center-route';
import eventsRouterV1 from './event-route';
import userRouterV1 from './user-routes';

const routesV1 = (app) => {
  app.use('/api/v1/', centersRouterV1);
  app.use('/api/v1/', eventsRouterV1);
  app.use('/api/v1/', userRouterV1);
};

export default routesV1;
