import validator from 'validatorjs';
import moment from 'moment';
import Sequelize from 'sequelize';
import model from '../models';
import messageBody from '../config/mail-template';
import Mailer from '../services/mail-service';

const Events = model.Event;
const Centers = model.Center;

const mailer = new Mailer();


const eventRules = {
  eventName: 'required|string|min:3|max:30',
  startDate: 'required|string',
  days: 'required|string',
  centerId: 'required|numeric'
};

const eventUpdateRules = {
  eventName: 'string|min:3|max:20',
  startDate: 'string',
  days: 'string',
  centerId: 'string'
};


/**
  *
  */
export default class EventController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} object or null
   */
  static checkDateAvailabity(req, res) {
    let query;
    if (req.params.eventId) {
      query = {
        centerId: req.body.centerId,
        [Sequelize.Op.or]: {
          startDate: {
            [Sequelize.Op.between]: [req.body.startDate, req.body.endDate]
          },
          endDate: {
            [Sequelize.Op.between]: [req.body.startDate, req.body.endDate]
          }
        },
        id: {
          [Sequelize.Op.ne]: parseInt(req.params.eventId, 10)
        }
      };
    } else {
      query = {
        centerId: req.body.centerId,
        [Sequelize.Op.or]: {
          startDate: {
            [Sequelize.Op.between]: [req.body.startDate, req.body.endDate]
          },
          endDate: {
            [Sequelize.Op.between]: [req.body.startDate, req.body.endDate]
          }
        }
      };
    }
    return Events.findOne({
      // to checked if date is booked
      where: query
    })
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
   * @param {*} req
   * @param {*} res
   * @returns {object} - the created center
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
        const message = messageBody.eventCreated(req.decoded.username);
        mailer.sendMail(req.decoded.email, message, 'New Event Created');
        return res.status(201).send({
          message: `${createdEvent.eventName} event Created Successfully`,
          eventId: createdEvent.id,
          statusCode: 201
        });
      });
  }

  /**
   * @param {*} event
   * @param {*} req
   * @param {*} res
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
      .then(modifiedEvent => modifiedEvent);
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} adds an event
   */
  static create(req, res) {
    const validate = new validator(req.body, eventRules);
    if (validate.passes()) {
      // format user date input to sequelize date input
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
      // check validation compliance of user input
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
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} return all events
   */
  static getAll(req, res) {
    return Events.findAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        {
          model: Centers,
          attributes: ['name']
        }
      ]
    })
      .then((events) => {
        if (events.length < 1) {
          return res.status(200).json({
            message: 'No Events Available',
            statusCode: 200
          });
        }
        return res.status(200).json({
          allEvents: events,
          statusCode: 200
        });
      });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns an event with Id provided
   */
  static get(req, res) {
    return Events.findOne({
      where: {
        id: req.params.eventId,
        userId: req.decoded.id
      },
      attributes: ['id', 'eventName', 'startDate', 'days', 'endDate', 'centerId', 'image', 'status']
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            message: 'Event Not Found',
          });
        }
        return res.status(200).json({ event });
      })
      .catch(error => res.status(500).send({ message: 'Internal Server Error' }));
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns {json} returns edited event
   */
  static update(req, res) {
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
                EventController.handleEventUpdate(event, req, res)
                  .then(modifiedEvent => res.status(200).json({
                    message: 'Event Updated Successfully', // to return this if user event is updated successfully
                    statusCode: 200
                  }));
              }
            });
        }).catch(error => res.status(500).json({ message: 'Server Error', statusCode: 500 }));
    } else {
      return res.status(400).json({ message: validate.errors, statusCode: 400 });
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
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
          return res.status(404).json({ message: 'Event does not exist' });
        }
        event.destroy()
          .then(() => res.status(200).send({ message: 'Event is successfully  deleted', statusCode: 200 }));
      })
      .catch(error => res.status(500).json({ message: 'Server Error', statusCode: 500 }));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} handles approving of events by admin
   */
  static approveEvent(req, res) {
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
          event.update({
            status: 'accepted'
          })
            .then(() => {
              const message =
                messageBody.eventApproved(event.User.username, event.Center.name, event.startDate);
              mailer.sendMail(event.User.email, message, 'Event Approved');
              return res.status(200).json({ event, message: 'Event Approved', statusCode: 200 });
            });
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
    return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
  }

  /**
   * @param  {*} req
   * @param  {*} res
   * @returns {*} handles action for rejecting an event
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
          event.update({
            status: 'rejected'
          })
            .then(() => {
              const message = messageBody.eventRejected(
                event.User.username,
                event.Center.name,
                event.startDate
              );
              mailer.sendMail(event.User.email, message, 'Event Cancelled');
              return res.status(200).json({ event, message: 'Event Cancelled', statusCode: 200 });
            });
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
    return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
  }

  /**
   * @param  {*} req
   * @param  {*} res
   * @returns {*} all pending events in a center
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
   * @param  {*} req
   * @param  {*} res
   * @returns {*} all upcoming events in a center
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

