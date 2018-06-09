import express from 'express';
import EventController from '../../controllers/v1/EventController';
import Security from '../../middlewares/Security';
import RequestSanitizer from '../../middlewares/RequestSanitizer';

const eventsRouterV1 = express.Router();

eventsRouterV1.post(
  '/events',
  Security.check,
  RequestSanitizer.newEventPreValidation,
  RequestSanitizer.handleValidation,
  EventController.processDates,
  EventController.checkDateAvailabity,
  EventController.handleEventInsert
);

eventsRouterV1.get(
  '/events',
  Security.check,
  RequestSanitizer.sanitizeQuery,
  RequestSanitizer.prepareGetAllRequest,
  EventController.generateQuery,
  EventController.handleGetAll
);

eventsRouterV1.get(
  '/events/:eventId',
  Security.check,
  RequestSanitizer.validateParameters,
  EventController.getSingleEvent
);

eventsRouterV1.put(
  '/events/response/',
  Security.check,
  RequestSanitizer.eventStatusPreValidation,
  RequestSanitizer.handleValidation,
  RequestSanitizer.checkIfAdmin,
  EventController.respondToEvent
);
eventsRouterV1.put(
  '/events/:eventId',
  Security.check,
  RequestSanitizer.validateParameters,
  RequestSanitizer.updateEventPreValidation,
  RequestSanitizer.handleValidation,
  EventController.fetchEventForUpdate,
  EventController.processDates,
  EventController.handleEventUpdate
);

eventsRouterV1.delete(
  '/events/:eventId',
  Security.check,
  RequestSanitizer.validateParameters,
  EventController.delete
);

export default eventsRouterV1;
