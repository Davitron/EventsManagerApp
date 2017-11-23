import express from 'express';
import EventController from '../controllers/event-controller';

const eventRoutes = (app) => {
  app.post('/events', EventController.create);
  app.get('/events', EventController.getAll);
  app.get('/events/:eventId', EventController.get);
  app.put('/events/:eventId', EventController.update);
  app.delete('/events/:eventId', EventController.delete);
};
export default eventRoutes;
