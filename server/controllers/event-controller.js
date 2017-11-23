import Event from '../models/event-model';
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
    if (!req.body.centerId) return res.status(400).send('centerId is required');
    if (!req.body.eventName) return res.status(400).send('event name is required');
    if (!req.body.eventDate) return res.status(400).send('event date is required');
    if (!req.body.creatorId) return res.status(400).send('creator id is required');
    const newId = store.events.length + 1;

    const newEvent = new Event(
      newId,
      req.body.centerId,
      req.body.eventName,
      req.body.eventDate,
      req.body.creatorId,
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
      return res.status(404).send('Event does not exit');
    }
    singleEvent.centerId = req.body.centerId;
    singleEvent.creatorId = req.body.creatorId;
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
      return res.status(404).send('Event does not exit');
    }
    const eventPos = store.events.map(event => event.id).indexOf(singleEvent.id);
    store.events.splice(eventPos, 1);
    res.status(200).json({ message: 'event was successfully deleted' });
  }
}
