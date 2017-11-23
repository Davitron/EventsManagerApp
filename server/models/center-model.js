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
     * @param {*} carPackCapacity
     */
  constructor(id, name, state, address, hasProjectors, hallCapacity, carPackCapacity) {
    if (typeof id !== 'number') {
      throw new Error('Id is not a number');
    } else {
      this.id = id;
    }
    this.name = name;
    this.state = state;
    this.address = address;

    if (typeof hasProjectors !== 'boolean') {
      throw new Error('hasProjectors must be boolean')
    } else {
      this.hasProjectors = hasProjectors;
    }

    if (typeof hallCapacity !== 'number') {
      throw new Error(' hallCapacity is not a number');
    } else {
      this.hallCapacity = hallCapacity;
    }

    if (typeof carPackCapacity !== 'number') {
      throw new Error(' carPackCapacity is not a number ');
    } else {
      this.carPackCapacity = carPackCapacity;
    }
  }
}

