import isValidDate from 'is-valid-date';
/**
 *
 */
export default class Event {
  /**
     *
     * @param {*} id
     * @param {*} centerId
     * @param {*} eventName
     * @param {*} eventDate
     * @param {*} creatorId
     */
  constructor(id, centerId, eventName, eventDate, creatorId) {
    if (typeof id !== 'number') {
      throw new TypeError('Id is not a number');
    } else {
      this.id = id;
    }

    if (typeof centerId !== 'number') {
      throw new TypeError('centerId is not a number');
    } else {
      this.centerId = centerId;
    }

    if (typeof eventName !== 'string') {
      throw new TypeError('eventName is not a string');
    } else {
      this.eventName = eventName;
    }

    if (isValidDate(eventDate)) {
      this.eventDate = eventDate;
    } else {
      throw new TypeError('eventDate is not a date');
    }

    if (typeof creatorId !== 'number') {
      throw new TypeError('creatorId is not a number');
    } else {
      this.creatorId = creatorId;
    }
  }
}
