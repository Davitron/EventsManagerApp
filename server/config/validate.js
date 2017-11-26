import isValidDate from 'is-valid-date';


const response = {};

/**
 *
 */
export default class Validator {
/**
 *
 * @param {*} event
 * @returns {json} checks if object passes validation test
 */
  static validateEvent(event) {
    if (Number.isNaN(event.centerId)) {
      response.value = false;
      response.message = 'centerId is not a number';
      return response;
    }

    if (!event.centerId) {
      response.value = false;
      response.message = 'centerId is required';
      return response;
    }


    if (!event.eventName) {
      response.value = false;
      response.message = 'eventName is required';
      return response;
    }


    if (Number.isNaN(event.creatorId)) {
      response.value = false;
      response.message = 'creatorId is not a number';
      return response;
    }

    if (!event.creatorId) {
      response.value = false;
      response.message = 'creatorId is required';
      return response;
    }

    if (!event.eventDate) {
      response.value = false;
      response.message = 'eventDate is required';
      return response;
    }

    if (!isValidDate(event.eventDate)) {
      response.value = false;
      response.message = 'Invalid Date Input';
      return response;
    }

    if (isValidDate(event.eventDate)) {
      const eventDate = new Date(event.eventDate);
      const now = new Date();
      if (eventDate > now) {
        response.value = false;
        response.message = 'The selected date is in the past';
      }
    }
    response.value = true;
    response.message = 'validation passed';
    return response;
  }

  /**
   *
   * @param {*} center
   * @return {json} returns object if objectr passes validation
   */
  static validateCenter(center) {
    if (!center.name) {
      response.value = false;
      response.message = 'center name is required';
      return response;
    }

    if (!center.state) {
      response.value = false;
      response.message = 'center state is required';
      return response;
    }

    if (!center.address) {
      response.value = false;
      response.message = 'center address is required';
      return response;
    }

    if (typeof center.hasProjectors === 'boolean') {
      response.value = false;
      response.message = 'hasProjectors must be boolean';
      return response;
    }

    if (!center.hallCapacity) {
      response.value = false;
      response.message = 'center hall Capacity is required';
      return response;
    }

    if (Number.isNaN(center.hallCapacity)) {
      response.value = false;
      response.message = 'hallCapacity must be a number';
      return response;
    }

    if (Number.isNaN(center.carParkCapacity)) {
      response.value = false;
      response.message = 'carkParkCapacity must be a number';
      return response;
    }

    if (!center.carParkCapacity) {
      response.value = false;
      response.message = 'center car park Capacity is required';
      return response;
    }

    response.value = true;
    response.message = 'validation is passed';
    return response;
  }
}
