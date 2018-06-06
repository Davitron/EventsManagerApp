import centersRouterV1 from './centersRouterV1';
import eventsRouterV1 from './eventsRouterV1';
import usersRouterV1 from './usersRouterV1';


const routesV1 = (app) => {
  app.use('/api/v1/', centersRouterV1);
  app.use('/api/v1/', eventsRouterV1);
  app.use('/api/v1/', usersRouterV1);
};

export default routesV1;
