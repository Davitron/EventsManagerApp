import validator from 'validatorjs';
import moment from 'moment';
import model from '../models';
import EventService from '../services/event-service';
import Mailer from '../services/mail-service';

const Events = model.Event;


const eventRules = {
  eventName: 'required|string|min:3|max:30',
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
    console.log(req.body);
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
          if (event === null) {
            EventService.create(req, eventStartDate, eventEndDate)
              .then((createdEvent) => {
                // to return this if event is created successfully
                const message = `<p>Well done ${req.decoded.user}.</p><br/>
                <p>
                  You have successfully created an event.<br />
                  You would get a response shortly from the event center
                </p>
                Thank you for using EventsManager`;
                const mailBody = {
                  from: 'matthews.segunapp@gmail.com',
                  to: req.decoded.email,
                  subject: 'New Event Created',
                  html: message
                };
                const mailer = new Mailer();
                if (mailer.isMailSent(mailBody)) {
                  res.status(500).json({
                    message: 'Oops!, an error has occured',
                    statusCode: 500
                  });
                } else {
                  return res.status(201).send({
                    message: `${createdEvent.eventName} event Created Successfully`,
                    eventId: createdEvent.id,
                    statusCode: 201
                  });
                }
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
          return res.status(200).json({
            message: 'No Events Available',
            statusCode: 200
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

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} handles approving of events by admin
   */
  static approveEvent(req, res) {
    if (req.decoded.isAdmin === true) {
      EventService.get(req)
        .then((event) => {
          if (event) {
            event.update({
              status: 'accepted'
            })
              .then(() => {
                const message = `<p>Hello ${event.User.username}</p><br/>
                <p>
                  This is to inform you that your event in ${event.Center.name}, scheduled for
                  ${moment(event.startDate).format('YYYY-MM-DD')} has been accepted by the center<br />
                  You can now proceed with you planning.<br/>
                  Do ensure to visit the center for more informations
                </p>
                Thank you for using EventsManager`;
                const mailBody = {
                  from: 'matthews.segunapp@gmail.com',
                  to: event.User.email,
                  subject: 'Event Accepted',
                  html: message
                };
                const mailer = new Mailer();
                if (mailer.isMailSent(mailBody)) {
                  res.status(500).json({
                    message: 'Oops!, an error has occured',
                    statusCode: 500
                  });
                } else {
                  return res.status(200).json({
                    event,
                    message: 'Event Approved'
                  });
                }
              }).catch((error) => {
                return res.status(500).json({
                  message: 'Oops!, an error has occured',
                });
              });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: 'Oops!, an error has occured',
          });
        });
    }
  }

  /**
   * @param  {*} req
   * @param  {*} res
   * @returns {*} handles action for rejecting an event
   */
  static rejectEvent(req, res) {
    if (req.decoded.isAdmin === true) {
      EventService.get(req)
        .then((event) => {
          if (event) {
            event.update({
              status: 'rejected'
            })
              .then(() => {
                const message = `<p>Hello ${event.User.username}</p><br/>
                <p>
                  Unfortunately your event in ${event.Center.name}, scheduled for
                  ${moment(event.startDate).format('YYYY-MM-DD')} has been cancelled by the center.<br />
                  Based on the information of your event,  the center suggests that you
                  reschedule your event to ${req.body.eventDate}<br/>
                </p>
                Thank you for using EventsManager`;
                const mailBody = {
                  from: 'matthews.segunapp@gmail.com',
                  to: event.User.email,
                  subject: 'Event Cancelled',
                  html: message
                };
                const mailer = new Mailer();
                if (mailer.isMailSent(mailBody)) {
                  res.status(500).json({
                    message: 'Oops!, an error has occured',
                    statusCode: 500
                  });
                } else {
                  return res.status(200).json({
                    event,
                    message: 'Event Cancelled'
                  });
                }
                return res.status(200).json({
                  event
                });
              }).catch((error) => {
                return res.status(500).json({
                  message: 'Oops!, an error has occured',
                });
              });
          }
        })
        .catch((error) => {
          return res.status(500).json({
            message: 'Oops!, an error has occured',
          });
        });
    }
  }

  /**
   * @param  {*} req
   * @param  {*} res
   * @returns {*} all pending events in a center
   */
  static getPendingEvents(req, res) {
    if (req.decoded.isAdmin === true) {
      EventService.getPendingEvents(req)
        .then((events) => {
          if (!events) {
            return res.status(404).json({
              message: 'There are no pending event for this center',
              statusCode: 404
            });
          }
          return res.status(200).json({
            pendingEvents: events,
            statusCode: 200
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            message: 'Oops!, an error has occured',
          });
        });
    }
  }

  /**
   * @param  {*} req
   * @param  {*} res
   * @returns {*} all upcoming events in a center
   */
  static getUpcomingEvents(req, res) {
    EventService.getUpcomingEvents(req)
      .then((events) => {
        if (!events) {
          return res.status(404).json({
            message: 'There are no upcoming event for this center',
            statusCode: 404
          });
        }
        return res.status(200).json({
          upcomingEvents: events,
          statusCode: 200
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: 'Oops!, an error has occured',
        });
      });
  }
}
