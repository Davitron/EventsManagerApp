import moment from 'moment';
import Sequelize from 'sequelize';
import model from '../../models';
import * as mailTemplate from '../../config/mailTemplate';
import Mailer from '../../services/Mailer';
import Pagination from '../../services/Pagination';


const Events = model.Event;
const Centers = model.Center;

const mailer = new Mailer();

/**
 * @exports
 *
 * @class
 */
export default class EventController {
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
  static processDates(req, res, next) {
    if (req.processDate !== false) {
      req.body.startDate = new Date(req.body.startDate);
      req.body.endDate = moment(req.body.startDate).add(req.body.days - 1, 'days').toDate();
      const now = new Date();
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
  static checkDateAvailabity(req, res, next) {
    let query;
    const defaultQuery = {
      centerId: req.body.centerId,
      [Sequelize.Op.or]: [
        {
          startDate: { [Sequelize.Op.between]: [req.body.startDate, req.body.endDate] }
        }, {
          endDate: {
            [Sequelize.Op.between]: [req.body.startDate, req.body.endDate]
          }
        }, {
          startDate: {
            [Sequelize.Op.lte]: req.body.startDate
          },
          endDate: {
            [Sequelize.Op.gte]: req.body.endDate
          }
        }
      ]
    };

    if (req.params.eventId) {
      query = {
        ...defaultQuery,
        id: { [Sequelize.Op.ne]: parseInt(req.params.eventId, 10) }
      };
    } else {
      query = { ...defaultQuery };
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
  static handleEventInsert(req, res) {
    return Events.create({
      eventName: req.body.eventName,
      centerId: parseInt(req.body.centerId, 10),
      startDate: req.body.startDate,
      days: req.body.days,
      endDate: req.body.endDate,
      userId: req.decoded.id,
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
   * @memberof EventController
   *
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - the created center
   */
  static handleEventUpdate(req, res) {
    const event = req.currentEvent;
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
  static generateQuery(req, res, next) {
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
  static handleGetAll(req, res) {
    const { limit, offset, DBQuery } = req.meta;
    return Events.findAndCountAll({
      where: DBQuery,
      attributes: [
        'id',
        'eventName',
        'startDate',
        'endDate',
        'image',
        'status',
        'centerId',
        [Sequelize.col('Center.name'), 'venue']
      ],
      include: [{ model: Centers, attributes: ['name'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    }).then((events) => {
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
          pagination: Pagination.createPagingData(events, req.meta),
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
  static getSingleEvent(req, res) {
    return Events.findOne({
      where: { id: req.params.eventId, userId: req.decoded.id },
      attributes: ['id', 'eventName', 'startDate', 'days', 'endDate', 'centerId', 'image', 'status']
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event Not Found', statusCode: 404 });
        }
        return res.status(200).json({ message: 'Event Retrieved', event, statusCode: 200 });
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
  static fetchEventForUpdate(req, res, next) {
    return Events.findOne({
      where: {
        id: req.params.eventId,
        userId: req.decoded.id
      }
    })
      .then((event) => {
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
  static delete(req, res) {
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
  static respondToEvent(req, res) {
    return Events.findOne({
      where: { id: req.body.id },
      include: [
        { model: model.Center, attributes: ['name'] },
        { model: model.User, attributes: ['email', 'username'] }
      ]
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found', statusCode: 200 });
        }
        event.update({ status: req.body.status })
          .then(({ status }) => {
            const { eventApproved, eventRejected } = mailTemplate.messageBody;
            let message;
            let title;
            if (status === 'accepted') {
              title = 'Event Approved';
              message = eventApproved(event.User.username, event.Center.name, event.startDate);
            } else {
              title = 'Event Declined';
              message = eventRejected(event.User.username, event.Center.name, event.startDate);
            }
            mailer.sendMail(event.User.email, message, title);
            return res.status(200).json({ event, message: title, statusCode: 200 });
          });
      });
  }
}

