import express from 'express';
import EventController from '../controllers/event-controller';

const eventRoutes = (app) => {
  app.post('/api/v1/events', EventController.create);
  app.get('/api/v1/events', EventController.getAll);
  app.get('/api/v1/events/:eventId', EventController.get);
  app.put('/api/v1/events/:eventId', EventController.update);
  app.delete('/api/v1/events/:eventId', EventController.delete);
};
export default eventRoutes;
