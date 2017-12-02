import validator from 'validatorjs';
import moment from 'moment';
import model from '../models';

const Events = model.Event;


const eventRules = {
  eventName: 'required|string|min:3|max:20',
  startDate: 'required|string',
  days: 'required|string',
  centerId: 'required|string'
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
    const eventEndDate = moment(eventStartDate).add(req.body.days, 'days').toDate();
    if (validate.passes()) {
      // check validation compliance of user input
      Events.findOne({
        // to checked if date is booked
        where: {
          centerId: req.body.centerId,
          startDate: {
            $gte: eventStartDate,
            $lte: eventEndDate
          },
          endDate: {
            $gte: eventStartDate,
            $lte: eventEndDate,
          }
        }
      }).then((event) => {
        if (!event) {
          Events.create({
            eventName: req.body.eventName,
            centerId: req.body.centerId,
            startDate: eventStartDate,
            days: req.body.days,
            endDate: eventEndDate,
            userId: req.decoded.id,
            image: 'xfgxgdhxgdh',
            status: req.body.status
          }).then((createdEvent) => {
            return res.status(201).send({
              message: 'Event Created Successfully', // to return this if event is created successfully
              newEvent: createdEvent
            });
          }).catch(err => res.status(500).send({ message: err }));
        } else {
          return res.status(400).json({ message: 'The selected date is booked' }); // to return this if date is booked
        }
      }).catch((err) => {
        return res.status(500).send({ message: err });
      });
    } else {
      return res.status(400).json({ message: validate.errors });
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} return all events
   */
  static getAll(req, res) {
    return Events.findAll().then((events) => {
      if (events.length < 1) {
        res.status(200).json({
          message: 'No Events Available'
        });
      }
      res.status(200).json({ allEvents: events });
    }).catch(err => res.status(500).json({
      message: 'Oops!, an error has occured',
      error: err.name
    }));
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
    const eventEndDate = moment(eventStartDate).add(req.body.days, 'days').toDate();
    // check validation compliance of user input
    if (validate.passes()) {
      Events.findOne({
        where: {
          id: req.params.eventId
        }
      }).then((event) => {
        // check if this event was created by this user
        if (req.decoded.id === event.userId) {
          event.update({
            eventName: req.body.eventName || event.eventName,
            centerId: req.body.centerId || event.centerId,
            startDate: eventStartDate || event.startDate,
            days: req.body.days || event.days,
            endDate: eventEndDate || event.endDate,
            image: 'xfgxgdhxgdh' || event.image,
            status: req.body.status || event.status
          }).then((modifiedEvent) => {
            res.status(200).json({
              message: 'Event Updated Successfully', // to return this if user event is updated successfully
              newEvent: modifiedEvent
            });
          }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: err });
          });
        } else {
          return res.status(401).json({ message: 'Not Authorized' });
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
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
    return Events.findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            message: 'Event does not exist',
          });
        }
        event.destroy()
          .then(() => res.status(200).send({ message: 'Event is successfully  deleted' }))
          .catch(error => res.status(400).json({ err: error }));
      })
      .catch(error => res.status(400).json({ err: error }));
  }
}
