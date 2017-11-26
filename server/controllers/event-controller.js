import Event from '../models/event-model';
import Validator from '../config/validate';
import store from '../config/mockDB';


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
    req.body.centerId = Number(req.body.centerId);
    const validationResponse = Validator.validateEvent(req.body);
    if (!validationResponse.value) {
      return res.status(400).json({ message: validationResponse.message });
    }

    const newId = store.events.length + 1;
    const newEvent = new Event(
      newId,
      Number(req.body.centerId),
      req.body.eventName,
      req.body.eventDate,
      Number(req.body.creatorId),
    );
    store.events.push(newEvent);
    return res.status(201).json(newEvent);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} return all events
   */
  static getAll(req, res) {
    res.status(200).json(store.events);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns an event by id
   */
  static get(req, res) {
    const singleEvent = store.events.find(event => event.id === Number(req.params.eventId));
    return res.status(200).json(singleEvent);
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns {json} returns edited event
   */
  static update(req, res) {
    const singleEvent = store.events.find(event => event.id === Number(req.params.eventId));
    if (singleEvent === null || singleEvent === undefined) {
      return res.status(404).json({ message: 'Event does not exist' });
    }


    singleEvent.centerId = Number(req.body.centerId);
    singleEvent.creatorId = Number(req.body.creatorId);
    singleEvent.eventDate = req.body.eventDate;
    singleEvent.eventName = req.body.eventName;

    const pos = store.events.map(event => event.id).indexOf(singleEvent.id);
    store.events[pos] = singleEvent;
    return res.status(200).json(store.events[pos]);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns message object
   */
  static delete(req, res) {
    const singleEvent = store.events.find(event => event.id === Number(req.params.eventId));
    if (singleEvent === null || singleEvent === undefined) {
      return res.status(404).json({ message: 'Event does not exist' });
    }
    const eventPos = store.events.map(event => event.id).indexOf(singleEvent.id);
    store.events.splice(eventPos, 1);
    res.status(200).json({ message: 'event was successfully deleted' });
  }
}
