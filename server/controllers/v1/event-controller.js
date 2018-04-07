import validator from 'validatorjs';
import moment from 'moment';
import Sequelize from 'sequelize';
import model from '../../models';
import * as mailTemplate from '../../config/mail-template';
import Mailer from '../../services/mail-service';
import Pagination from '../../services/pagingService';

const Events = model.Event;
const Centers = model.Center;

const mailer = new Mailer();


const eventRules = {
  eventName: 'required|string|min:3|max:30',
  startDate: 'required|string',
  days: 'required|numeric',
  centerId: 'required|numeric'
};

const eventUpdateRules = {
  eventName: 'string|min:3|max:20',
  startDate: 'string',
  days: 'numeric',
  centerId: 'string'
};


/**
 * @exports
 *
 * @class
 */
export default class EventController {
  /**
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object|null}
   *
   * returns null if selected date is free
   * or JSON response if date is booked
   */
  static checkDateAvailabity(req, res) {
    let query;
    if (req.params.eventId) {
      query = {
        centerId: req.body.centerId,
        [Sequelize.Op.or]: {
          startDate: { [Sequelize.Op.between]: [req.body.startDate, req.body.endDate] },
          endDate: { [Sequelize.Op.between]: [req.body.startDate, req.body.endDate] }
        },
        id: { [Sequelize.Op.ne]: parseInt(req.params.eventId, 10) }
      };
    } else {
      query = {
        centerId: req.body.centerId,
        [Sequelize.Op.or]: {
          startDate: { [Sequelize.Op.between]: [req.body.startDate, req.body.endDate] },
          endDate: { [Sequelize.Op.between]: [req.body.startDate, req.body.endDate] }
        }
      };
    }
    return Events.findOne({ where: query })
      .then((available) => {
        if (available) {
          return res.status(400).json({
            message: 'The selected date is booked',
            center: available,
            statusCode: 400
          });
        }
        return null;
      });
  }

  /**
   *
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - JSON resonse
   *
   * Inserts new event into Events table
   */
  static handleEventInsert(req, res) {
    return Events.create({
      eventName: req.body.eventName,
      centerId: parseInt(req.body.centerId, 10),
      startDate: req.body.startDate,
      days: req.body.days,
      endDate: req.body.endDate,
      userId: req.body.userId,
      image: req.body.image,
    })
      .then((createdEvent) => {
        const message = mailTemplate.messageBody.eventCreated(req.decoded.username);
        mailer.sendMail(req.decoded.email, message, 'New Event Created');
        return res.status(201).send({
          message: `${createdEvent.eventName} event Created Successfully`,
          createdEvent,
          statusCode: 201
        });
      });
  }

  /**
   * @memberOf EventController
   *
   * @param {object} event
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - the created center
   */
  static handleEventUpdate(event, req, res) {
    return event.update({
      eventName: req.body.eventName || event.eventName,
      centerId: req.body.centerId || event.centerId,
      startDate: req.body.startDate || event.startDate,
      days: req.body.days || event.days,
      endDate: req.body.endDate || event.endDate,
      image: req.body.image || event.image,
      status: req.body.status || event.status
    })
      .then(modifiedEvent => res.status(200).json({
        message: 'Event Updated Successfully',
        modifiedEvent,
        statusCode: 200
      }));
  }

  /**
   *
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - JSON resonse
   */
  static create(req, res) {
    const validate = new validator(req.body, eventRules);
    if (validate.passes()) {
      req.body.startDate = new Date(req.body.startDate);
      req.body.endDate = moment(req.body.startDate).add(req.body.days - 1, 'days').toDate();
      req.body.userId = req.decoded.id;
      const now = new Date();
      if (req.body.startDate < now) {
        return res.status(400).json({
          message: 'Date must be in the future',
          statusCode: 400
        });
      }
      return EventController.checkDateAvailabity(req, res)
        .then((report) => {
          if (report === null) {
            return EventController.handleEventInsert(req, res);
          }
        });
    }
    return res.status(400).json({ message: validate.errors, statusCode: 400 });
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
  static getAll(req, res) {
    const limit = parseInt(req.params.limit, 10) || 9;
    let offset = 0;
    const currentPage = parseInt(req.query.page, 10) || 1;
    offset = limit * (currentPage - 1);
    return Events.findAndCountAll({
      where: { userId: req.decoded.id },
      include: [{ model: Centers, attributes: ['name'] }],
      limit,
      offset
    }).then((events) => {
      if (events.rows < 1) {
        return res.status(200).json({
          message: 'No Events Available',
          data: [],
          meta: [],
          statusCode: 200
        });
      }
      return res.status(200).json({
        message: 'Events Retrieved',
        data: events.rows,
        meta: Pagination.createPagingData(events, limit, offset, currentPage),
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
  static get(req, res) {
    if (isNaN(req.params.eventId)) return res.status(400).json({ message: 'Invalid eventId', statusCode: 400 });
    return Events.findOne({
      where: { id: req.params.eventId, userId: req.decoded.id },
      attributes: ['id', 'eventName', 'startDate', 'days', 'endDate', 'centerId', 'image', 'status']
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event Not Found' });
        }
        return res.status(200).json({ event });
      })
      .catch(error => res.status(500).send({ message: 'Internal Server Error' }));
  }

  /**
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - JSON response
   */
  static update(req, res) {
    if (isNaN(req.params.eventId)) return res.status(400).json({ message: 'Invalid Event Id', statusCode: 400 });
    const validate = new validator(req.body, eventRules);
    if (validate.passes(req.body, eventUpdateRules)) {
      req.body.startDate = new Date(req.body.startDate);
      req.body.endDate = moment(req.body.startDate).add(req.body.days - 1, 'days').toDate();
      req.body.userId = req.decoded.id;
      const now = new Date();
      if (req.body.startDate > now) {
        req.body.status = 'pending';
      }
      if (req.body.startDate < now) {
        return res.status(400).json({
          message: 'Date must be in the future',
          statusCode: 400
        });
      }
      Events.findOne({
        where: {
          id: req.params.eventId,
          userId: req.decoded.id
        }
      })
        .then((event) => {
          if (event === null) {
            return res.status(404).json({ message: 'Event not found', statusCode: 404 });
          }
          return EventController.checkDateAvailabity(req, res)
            .then((report) => {
              if (report === null) {
                return EventController.handleEventUpdate(event, req, res);
              }
            });
        }).catch(error => res.status(500).json({ message: 'Server Error', statusCode: 500 }));
    } else {
      return res.status(400).json({ message: validate.errors, statusCode: 400 });
    }
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
  static delete(req, res) {
    if (isNaN(req.params.eventId)) return res.status(400).json({ message: 'Invalid EventId', statusCode: 400 });
    return Events.findOne({
      where: {
        id: req.params.eventId,
        userId: req.decoded.id
      }
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event does not exist', statusCode: 404 });
        }
        return event.destroy()
          .then(() => res.status(200).send({ message: 'Event is successfully  deleted', statusCode: 200 }));
      })
      .catch(error => res.status(500).json({ message: 'Server Error', statusCode: 500 }));
  }

  /**
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} handles approving of events by admin
   */
  static approveEvent(req, res) {
    if (req.decoded.isAdmin === true) {
      return Events.findOne({
        where: { id: req.params.eventId },
        include: [
          { model: model.Center, attributes: ['name'] },
          { model: model.User, attributes: ['email', 'username'] }
        ]
      })
        .then((event) => {
          if (!event) return res.status(404).json({ message: 'Event not found', statusCode: 404 });
          return event.update({
            status: 'accepted'
          })
            .then(() => {
              const { eventApproved } = mailTemplate.messageBody;

              const message =
                eventApproved(event.User.username, event.Center.name, event.startDate);

              mailer.sendMail(event.User.email, message, 'Event Approved');
              res.status(200).json({ event, message: 'Event Approved', statusCode: 200 });
            });
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
    return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
  }

  /**
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} handles action for rejecting an event
   */
  static rejectEvent(req, res) {
    if (req.decoded.isAdmin === true) {
      return Events.findOne({
        where: {
          id: req.params.eventId
        },
        include: [
          {
            model: model.Center,
            attributes: ['name']
          },
          {
            model: model.User,
            attributes: ['email', 'username']
          }
        ]
      })
        .then((event) => {
          if (!event) return res.status(404).json({ message: 'Event not found', statusCode: 404 });
          return event.update({
            status: 'rejected'
          })
            .then(() => {
              const message = mailTemplate.messageBody.eventRejected(
                event.User.username,
                event.Center.name,
                event.startDate
              );
              mailer.sendMail(event.User.email, message, 'Event Cancelled');
              res.status(200).json({ event, message: 'Event Cancelled', statusCode: 200 });
            });
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
    return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
  }

  /**
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} all pending events in a center
   */
  static getPendingEvents(req, res) {
    if (req.decoded.isAdmin === true) {
      return Events.findAll({
        where: {
          centerId: req.params.centerId,
          status: 'pending'
        },
        include: [
          {
            model: Centers
          }
        ]
      })
        .then((events) => {
          if (!events) {
            return res.status(404).json({
              message: 'There are no pending event for this center',
              statusCode: 404
            });
          }
          return res.status(200).json({ pendingEvents: events, statusCode: 200 });
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
  }


  /**
   * @memberOf EventController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} all upcoming events in a center
   */
  static getUpcomingEvents(req, res) {
    return Events.findAll({
      where: {
        centerId: req.params.centerId,
        startDate: {
          [Sequelize.Op.gt]: new Date()
        },
        status: 'accepted'
      }
    })
      .then((events) => {
        if (!events) {
          return res.status(404).json({
            message: 'There are no upcoming event for this center',
            statusCode: 404
          });
        }
        return res.status(200).json({ upcomingEvents: events, statusCode: 200 });
      })
      .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
  }
}

