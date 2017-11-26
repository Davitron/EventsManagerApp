
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
    this.id = id;
    this.centerId = centerId;
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.creatorId = creatorId;

    // if (isValidDate(eventDate)) {
      
    // } else {
    //   throw new TypeError('eventDate is not a date');
    // }

    // if (Number.isNaN(creatorId)) {
    //   throw new TypeError('creatorId is not a number');
    // } else {
    //   this.creatorId = creatorId;
    // }
  }
}
