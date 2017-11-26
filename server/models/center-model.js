/**
 *
 */
export default class Center {
  /**
   *
   * @param {*} id
   * @param {*} name
   * @param {*} state
   * @param {*} address
   * @param {*} hasProjectors
   * @param {*} hallCapacity
   * @param {*} carParkCapacity
   */
  constructor(id, name, state, address, hasProjectors, hallCapacity, carParkCapacity) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.address = address;
    this.hasProjectors = hasProjectors;
    this.hallCapacity = hallCapacity;
    this.carParkCapacity = carParkCapacity;
  }
}

