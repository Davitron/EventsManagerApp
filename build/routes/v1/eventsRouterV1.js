'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EventController = require('../../controllers/v1/EventController');

var _EventController2 = _interopRequireDefault(_EventController);

var _Security = require('../../middlewares/Security');

var _Security2 = _interopRequireDefault(_Security);

var _RequestSanitizer = require('../../middlewares/RequestSanitizer');

var _RequestSanitizer2 = _interopRequireDefault(_RequestSanitizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventsRouterV1 = _express2.default.Router();

eventsRouterV1.post('/events', _Security2.default.check, _RequestSanitizer2.default.newEventPreValidation, _RequestSanitizer2.default.handleValidation, _EventController2.default.processDates, _EventController2.default.checkDateAvailabity, _EventController2.default.handleEventInsert);

eventsRouterV1.get('/events', _Security2.default.check, _RequestSanitizer2.default.sanitizeQuery, _RequestSanitizer2.default.prepareGetAllRequest, _EventController2.default.generateQuery, _EventController2.default.handleGetAll);

eventsRouterV1.get('/events/:eventId', _Security2.default.check, _RequestSanitizer2.default.validateParameters, _EventController2.default.getSingleEvent);

eventsRouterV1.put('/events/response/', _Security2.default.check, _RequestSanitizer2.default.eventStatusPreValidation, _RequestSanitizer2.default.handleValidation, _RequestSanitizer2.default.checkIfAdmin, _EventController2.default.respondToEvent);
eventsRouterV1.put('/events/:eventId', _Security2.default.check, _RequestSanitizer2.default.validateParameters, _RequestSanitizer2.default.updateEventPreValidation, _RequestSanitizer2.default.handleValidation, _EventController2.default.fetchEventForUpdate, _EventController2.default.processDates, _EventController2.default.handleEventUpdate);

eventsRouterV1.delete('/events/:eventId', _Security2.default.check, _RequestSanitizer2.default.validateParameters, _EventController2.default.delete);

exports.default = eventsRouterV1;
//# sourceMappingURL=eventsRouterV1.js.map