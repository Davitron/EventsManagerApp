import validator from 'validatorjs';
import moment from 'moment';
import model from '../models';
import EventService from '../services/event-service';

const Events = model.Event;


const eventRules = {
  eventName: 'required|string|min:3|max:20',
  startDate: 'required|string',
  days: 'required|string',
  centerId: 'required|string'
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
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} adds an event
   */
  static create(req, res) {
    const validate = new validator(req.body, eventRules);
    // format user date input to sequelize date input
    const eventStartDate = new Date(req.body.startDate);
    const eventEndDate = moment(eventStartDate).add(req.body.days - 1, 'days').toDate();
    const now = new Date();
    if (eventStartDate < now) {
      return res.status(400).json({
        message: 'Date must be in the future',
        statusCode: 400
      });
    }
    if (validate.passes()) {
      // check validation compliance of user input
      return EventService.checkDateAvailabity(req.body.centerId, eventStartDate, eventEndDate)
        .then((event) => {
          console.log(event);
          if (event === null) {
            EventService.create(req, eventStartDate, eventEndDate)
              .then((createdEvent) => {
                // to return this if event is created successfully
                return res.status(201).send({
                  message: `${createdEvent.eventName} event Created Successfully`,
                  eventId: createdEvent.id,
                  statusCode: 201
                });
              }).catch((error) => {
                console.log(error);
                return res.status(500).json({
                  message: 'Server Error',
                  statusCode: 500
                });
              });
          } else {
            return res.status(400).json({
              message: 'The selected date is booked',
              statusCode: 400
            });
          }
        }).catch((error) => {
          console.log(error);
          return res.status(500).json({
            message: 'Server Error',
            statusCode: 500
          });
        });
    }
    return res.status(400).json({
      message: validate.errors,
      statusCode: 400
    });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} return all events
   */
  static getAll(req, res) {
    return EventService.getAll(req)
      .then((events) => {
        if (events.length < 1) {
          return res.status(404).json({
            message: 'No Events Available',
            statusCode: 404
          });
        }
        return res.status(200).json({
          allEvents: events,
          statusCode: 200
        });
      }).catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'Server Error',
          statusCode: 500
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
    return Events.findById(req.params.eventId).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: 'Center Not Found',
        });
      }
      return res.status(200).send(event);
    })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns {json} returns edited event
   */
  static update(req, res) {
    const validate = new validator(req.body, eventRules);
    const eventStartDate = new Date(req.body.startDate);
    const eventEndDate = moment(eventStartDate).add(req.body.days - 1, 'days').toDate();
    const now = new Date();
    if (eventStartDate < now) {
      return res.status(400).json({
        message: 'Date must be in the future',
        statusCode: 400
      });
    }
    if (validate.passes(req.body, eventUpdateRules)) {
      EventService.get(req)
        .then((event) => {
          if (event === null) {
            return res.status(404).json({
              message: 'Event not found',
              statusCode: 404
            });
          }
          EventService.checkDateAvailabity(event.centerId, eventStartDate, eventEndDate)
            .then((existingEvent) => {
              if (existingEvent !== null) {
                return res.status(404).json({
                  message: 'The selected date is booked',
                  statusCode: 400
                });
              }
              EventService.update(event, req, eventStartDate, eventEndDate)
                .then((modifiedEvent) => {
                  console.log(modifiedEvent);
                  return res.status(200).json({
                    message: 'Event Updated Successfully', // to return this if user event is updated successfully
                    statusCode: 200
                  });
                }).catch((error) => {
                  console.log(error);
                  return res.status(500).json({
                    message: 'Server Error',
                    statusCode: 500
                  });
                });
            }).catch((error) => {
              console.log(error);
              return res.status(500).json({
                message: 'Server Error',
                statusCode: 500
              });
            });
        }).catch((error) => {
          console.log(error);
          return res.status(500).json({
            message: 'Server Error',
            statusCode: 500
          });
        });
    } else {
      return res.status(400).json({
        message: validate.errors,
        statusCode: 400
      });
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns message object if event is deleted successfully
   */
  static delete(req, res) {
    return EventService.get(req)
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            message: 'Event does not exist',
          });
        }
        event.destroy()
          .then(() => {
            return res.status(200).send({
              message: 'Event is successfully  deleted',
              statusCode: 200
            });
          }).catch((error) => {
            console.log(error);
            res.status(500).json({
              error: 'Server Error',
              statusCode: 500
            });
          });
      })
      .catch(error => res.status(400).json({ err: error }));
  }
}
