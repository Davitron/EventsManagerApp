'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _mailTemplate = require('../../config/mailTemplate');

var mailTemplate = _interopRequireWildcard(_mailTemplate);

var _Mailer = require('../../services/Mailer');

var _Mailer2 = _interopRequireDefault(_Mailer);

var _Pagination = require('../../services/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = _models2.default.Event;
var Centers = _models2.default.Center;

var mailer = new _Mailer2.default();

/**
 * @exports
 *
 * @class
 */

var EventController = function () {
  function EventController() {
    _classCallCheck(this, EventController);
  }

  _createClass(EventController, null, [{
    key: 'processDates',

    /**
     * @memberof EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @param {function} next - call to the next function
     *
     * @returns {object|next} Procces and validate date
     */
    value: function processDates(req, res, next) {
      if (req.processDate !== false) {
        req.body.startDate = new Date(req.body.startDate);
        req.body.endDate = (0, _moment2.default)(req.body.startDate).add(req.body.days - 1, 'days').toDate();
        var now = new Date();
        if (req.body.startDate < now) {
          return res.status(400).json({
            message: 'Date must be in the future',
            statusCode: 400
          });
        }
        return next();
      }
      next();
    }

    /**
     * @memberof EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @param {function} next - call the next function
     *
     * @returns {object|next}
     *
     * returns null if selected date is free
     * or JSON response if date is booked
     */

  }, {
    key: 'checkDateAvailabity',
    value: function checkDateAvailabity(req, res, next) {
      var query = void 0;
      var defaultQuery = _defineProperty({
        centerId: req.body.centerId
      }, _sequelize2.default.Op.or, [{
        startDate: _defineProperty({}, _sequelize2.default.Op.between, [req.body.startDate, req.body.endDate])
      }, {
        endDate: _defineProperty({}, _sequelize2.default.Op.between, [req.body.startDate, req.body.endDate])
      }, {
        startDate: _defineProperty({}, _sequelize2.default.Op.lte, req.body.startDate),
        endDate: _defineProperty({}, _sequelize2.default.Op.gte, req.body.endDate)
      }]);

      if (req.params.eventId) {
        query = _extends({}, defaultQuery, {
          id: _defineProperty({}, _sequelize2.default.Op.ne, parseInt(req.params.eventId, 10))
        });
      } else {
        query = _extends({}, defaultQuery);
      }
      return Events.findOne({ where: query }).then(function (available) {
        if (available) {
          return res.status(400).json({
            message: 'The selected date is booked',
            center: available,
            statusCode: 400
          });
        }
        return next();
      });
    }

    /**
     *
     * @memberof EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {object} - JSON resonse
     *
     * Inserts new event into Events table
     */

  }, {
    key: 'handleEventInsert',
    value: function handleEventInsert(req, res) {
      return Events.create({
        eventName: req.body.eventName,
        centerId: parseInt(req.body.centerId, 10),
        startDate: req.body.startDate,
        days: req.body.days,
        endDate: req.body.endDate,
        userId: req.decoded.id,
        image: req.body.image
      }).then(function (createdEvent) {
        var message = mailTemplate.messageBody.eventCreated(req.decoded.username);
        mailer.sendMail(req.decoded.email, message, 'New Event Created');
        return res.status(201).send({
          message: createdEvent.eventName + ' event Created Successfully',
          createdEvent: createdEvent,
          statusCode: 201
        });
      });
    }

    /**
     * @memberof EventController
     *
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {object} - the created center
     */

  }, {
    key: 'handleEventUpdate',
    value: function handleEventUpdate(req, res) {
      var event = req.currentEvent;
      return event.update({
        eventName: req.body.eventName || event.eventName,
        centerId: req.body.centerId || event.centerId,
        startDate: req.body.startDate || event.startDate,
        days: req.body.days || event.days,
        endDate: req.body.endDate || event.endDate,
        image: req.body.image || event.image,
        status: req.body.status || event.status
      }).then(function (modifiedEvent) {
        return res.status(200).json({
          message: 'Event Updated Successfully',
          modifiedEvent: modifiedEvent,
          statusCode: 200
        });
      });
    }

    /**
     * @memberof EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @param {function} next - call to the next function
     *
     * @returns {object|next} Procces and validate date
     */

  }, {
    key: 'generateQuery',
    value: function generateQuery(req, res, next) {
      if (req.query.status) req.meta.DBQuery.status = req.query.status;

      if (req.query.centerId) req.meta.DBQuery.centerId = req.query.centerId;

      if (!req.query.status && !req.query.centerId && req.decoded.id) {
        req.meta.DBQuery = { userId: req.decoded.id };
      }
      // req.meta = reqMeta;
      next();
    }

    /**
     * @memberOf EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {object} - JSON resonse containing a list of all events
     */

  }, {
    key: 'handleGetAll',
    value: function handleGetAll(req, res) {
      var _req$meta = req.meta,
          limit = _req$meta.limit,
          offset = _req$meta.offset,
          DBQuery = _req$meta.DBQuery;

      return Events.findAndCountAll({
        where: DBQuery,
        attributes: ['id', 'days', 'eventName', 'startDate', 'endDate', 'image', 'status', 'centerId'],
        include: [{ model: Centers, as: 'center', attributes: ['name'] }],
        limit: limit,
        offset: offset,
        order: [['updatedAt', 'DESC']]
      }).then(function (events) {
        if (events.rows < 1) {
          return res.status(200).json({
            message: 'No Events Available',
            data: [],
            metadata: {},
            statusCode: 200
          });
        }
        return res.status(200).json({
          message: 'Events Retrieved',
          data: events.rows,
          metadata: {
            pagination: _Pagination2.default.createPagingData(events, req.meta)
          },
          statusCode: 200
        });
      });
    }

    /**
     * @memberOf EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {json} returns an event with Id provided
     */

  }, {
    key: 'getSingleEvent',
    value: function getSingleEvent(req, res) {
      return Events.findOne({
        where: { id: req.params.eventId, userId: req.decoded.id },
        attributes: ['id', 'days', 'eventName', 'startDate', 'days', 'endDate', 'centerId', 'image', 'status']
      }).then(function (event) {
        if (!event) {
          return res.status(404).json({ message: 'Event Not Found', statusCode: 404 });
        }
        return res.status(200).json({ message: 'Event Retrieved', event: event, statusCode: 200 });
      });
    }

    /**
     * @memberof EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @param {function} next - HTTP response object
     *
     * @returns {object} - JSON response
     */

  }, {
    key: 'fetchEventForUpdate',
    value: function fetchEventForUpdate(req, res, next) {
      return Events.findOne({
        where: {
          id: req.params.eventId,
          userId: req.decoded.id
        }
      }).then(function (event) {
        if (event === null) {
          return res.status(404).json({ message: 'Event not found', statusCode: 404 });
        }
        if (req.body.startDate && new Date(req.body.statDate) !== event.startDate) {
          req.currentEvent = event;
          req.processDate = true;
          return next();
        }
        req.currentEvent = event;
        req.processDate = false;
        return next();
      });
    }

    /**
     * @memberOf EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {json} returns message object if event is deleted successfully
     */

  }, {
    key: 'delete',
    value: function _delete(req, res) {
      return Events.findOne({
        where: {
          id: req.params.eventId,
          userId: req.decoded.id
        }
      }).then(function (event) {
        if (!event) {
          return res.status(404).json({ message: 'Event does not exist', statusCode: 404 });
        }
        return event.destroy().then(function () {
          return res.status(200).send({ message: 'Event is successfully  deleted', statusCode: 200 });
        });
      });
    }

    /**
     * @memberof EventController
     *
     * @param {object} req - HTTP request object
     *
     * @param {object} res - HTTP response object
     *
     * @returns {object} all upcoming events in a center
     */

  }, {
    key: 'respondToEvent',
    value: function respondToEvent(req, res) {
      return Events.findOne({
        where: { id: req.body.id },
        include: [{ model: _models2.default.Center, as: 'center', attributes: ['name'] }, { model: _models2.default.User, as: 'user', attributes: ['email', 'username'] }]
      }).then(function (event) {
        if (!event) {
          return res.status(404).json({ message: 'Event not found', statusCode: 200 });
        }
        event.update({ status: req.body.status }).then(function (_ref) {
          var status = _ref.status;
          var _mailTemplate$message = mailTemplate.messageBody,
              eventApproved = _mailTemplate$message.eventApproved,
              eventRejected = _mailTemplate$message.eventRejected;

          var message = void 0;
          var title = void 0;
          if (status === 'accepted') {
            title = 'Event Approved';
            message = eventApproved(event.user.username, event.center.name, event.startDate);
          } else {
            title = 'Event Declined';
            message = eventRejected(event.user.username, event.center.name, event.startDate);
          }
          mailer.sendMail(event.user.email, message, title);
          return res.status(200).json({ event: event, message: title, statusCode: 200 });
        });
      });
    }
  }]);

  return EventController;
}();

exports.default = EventController;
//# sourceMappingURL=EventController.js.map