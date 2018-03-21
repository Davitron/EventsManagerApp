import EventController from '../controllers/event-controller';
import Security from '../middlewares/security';


const eventRoutes = (app) => {
  app.post('/api/v1/events', Security.check, EventController.create);
  app.get('/api/v1/events', Security.check, EventController.getAll);
  app.get('/api/v1/events/:eventId', Security.check, EventController.get);
  app.get('/api/v1/events/pending/:centerId', Security.check, EventController.getPendingEvents);
  app.get('/api/v1/events/upcoming/:centerId', EventController.getUpcomingEvents);
  app.put('/api/v1/events/:eventId', Security.check, EventController.update);
  app.put('/api/v1/events/approve/:eventId', Security.check, EventController.approveEvent);
  app.put('/api/v1/events/reject/:eventId', Security.check, EventController.rejectEvent);
  app.delete('/api/v1/events/:eventId', Security.check, EventController.delete);
};
export default eventRoutes;
