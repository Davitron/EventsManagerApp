import express from 'express';
import EventController from '../../controllers/v1/event-controller';
import Security from '../../middlewares/security';
import ValidateRequest from '../../middlewares/request-validation';

const eventsRouterV1 = express.Router();

eventsRouterV1.post(
  '/events',
  Security.check,
  ValidateRequest.newEventPreValidation,
  ValidateRequest.handleValidation,
  EventController.processDates,
  EventController.checkDateAvailabity,
  EventController.handleEventInsert
);

eventsRouterV1.get(
  '/events',
  Security.check,
  ValidateRequest.sanitizeQuery,
  ValidateRequest.prepareGetAllRequest,
  EventController.generateQuery,
  EventController.handleGetAll
);

eventsRouterV1.get(
  '/events/:eventId',
  Security.check,
  ValidateRequest.validateParameters,
  EventController.getSingleEvent
);

eventsRouterV1.put(
  '/events/response/',
  Security.check,
  ValidateRequest.eventStatusPreValidation,
  ValidateRequest.handleValidation,
  ValidateRequest.checkIfAdmin,
  EventController.respondToEvent
);
eventsRouterV1.put(
  '/events/:eventId',
  Security.check,
  ValidateRequest.validateParameters,
  ValidateRequest.updateEventPreValidation,
  ValidateRequest.handleValidation,
  EventController.fetchEventForUpdate,
  EventController.processDates,
  EventController.handleEventUpdate
);

eventsRouterV1.delete(
  '/events/:eventId',
  Security.check,
  ValidateRequest.validateParameters,
  EventController.delete
);

export default eventsRouterV1;
