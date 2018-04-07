import express from 'express';
import EventController from '../../controllers/v1/event-controller';
import Security from '../../middlewares/security';

const eventsRouterV1 = express.Router();

eventsRouterV1.post('/events', Security.check, EventController.create);
eventsRouterV1.get('/events', Security.check, EventController.getAll);
eventsRouterV1.get('/events/:eventId', Security.check, EventController.get);
eventsRouterV1.get('/events/pending/:centerId', Security.check, EventController.getPendingEvents);
eventsRouterV1.get('/events/upcoming/:centerId', EventController.getUpcomingEvents);
eventsRouterV1.put('/events/:eventId', Security.check, EventController.update);
eventsRouterV1.put('/events/approve/:eventId', Security.check, EventController.approveEvent);
eventsRouterV1.put('/events/reject/:eventId', Security.check, EventController.rejectEvent);
eventsRouterV1.delete('/events/:eventId', Security.check, EventController.delete);

export default eventsRouterV1;
