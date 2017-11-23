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
      throw new Error('Id is not a number');
    } else {
      this.id = id;
    }
    this.centerId = centerId;
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.creatorId = creatorId;
  }
}
