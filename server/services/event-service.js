import Sequelize from 'sequelize';
import model from '../models';

const Centers = model.Center;
const Events = model.Event;

/**
 *
 */
export default class EventService {
  /**
   *
   * @param {*} eventCenterId
   * @param {*} startDate
   * @param {*} endDate
   * @returns {*} object or null
   */
  static checkDateAvailabity(eventCenterId, startDate, endDate) {
    const availableEvent = Events.findOne({
      // to checked if date is booked
      where: {
        centerId: eventCenterId,
        [Sequelize.Op.or]: {
          startDate: {
            [Sequelize.Op.between]: [startDate, endDate]
          },
          endDate: {
            [Sequelize.Op.between]: [startDate, endDate]
          }
        }
      }
    });
    return availableEvent;
  }

  /**
   *
   * @param {*} req
   * @param {*} startDate
   * @param {*} endDate
   * @returns {json} returns event object when created
   */
  static create(req, startDate, endDate) {
    return Events.create({
      eventName: req.body.eventName,
      centerId: req.body.centerId,
      startDate,
      days: req.body.days,
      endDate,
      userId: req.decoded.id,
      image: 'xfgxgdhxgdh',
    });
  }

  /**
 * fetches all events created by user
 * @param {*} req
 * @returns {json} an array of events
 *
 */
  static getAll(req) {
    return Events.findAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        {
          model: Centers
        }
      ]
    });
  }

  /**
 * fetches all  pending events in a center
 * @param {*} req
 * @returns {json} an array of events
 *
 */
  static getPendingEvents(req) {
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
    });
  }

  /**
 * fetches all upcoming events in a center
 * @param {*} req
 * @returns {json} an array of events
 *
 */
  static getUpcomingEvents(req) {
    return Events.findAll({
      where: {
        centerId: req.params.centerId,
        startDate: {
          [Sequelize.Op.gt]: new Date()
        }
      }
    });
  }

  /**
   *
   * @param {*} req
   * @returns {json} returns an event
   */
  static get(req) {
    return Events.findOne({
      where: {
        id: req.params.eventId,
        userId: req.decoded.id
      },
      attributes: ['id', 'eventName', 'startDate', 'endDate', 'status'],
      include: [
        {
          model: model.Center
        },
        {
          model: model.User
        }
      ]
    });
  }

  /**
 *
 * @param {*} event
 * @param {*} req
 * @param {*} eventStartDate
 * @param {*} eventEndDate
 * @returns {json} returns updatedEvent
 */
  static update(event, req, eventStartDate, eventEndDate) {
    let newStatus;
    if (req.body.status === undefined) {
      newStatus = event.status;
    } else {
      newStatus = req.body.status;
    }
    console.log(req.body.status);
    return event.update({
      eventName: req.body.eventName || event.eventName,
      centerId: req.body.centerId || event.centerId,
      startDate: eventStartDate || event.startDate,
      days: req.body.days || event.days,
      endDate: eventEndDate || event.endDate,
      image: 'xfgxgdhxgdh' || event.image,
      status: newStatus
    });
  }
}
