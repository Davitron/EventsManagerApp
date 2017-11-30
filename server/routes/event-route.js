import express from 'express';
import EventController from '../controllers/event-controller';
import Security from '../middlewares/security';


const eventRoutes = (app) => {
  app.post('/api/v1/events', Security.check, EventController.create);
  app.get('/api/v1/events', Security.check, EventController.getAll);
  app.get('/api/v1/events/:eventId', Security.check, EventController.get);
  app.put('/api/v1/events/:eventId', Security.check, EventController.update);
  app.delete('/api/v1/events/:eventId', Security.check, EventController.delete);
};
export default eventRoutes;
