import validator from 'validatorjs';

const signUpRules = {
  email: 'required|email',
  username: 'required|string|min:3|max:16',
  password: 'required|min:6',
  confirmPassword: 'required|min:6',
};

const centerUpdateRules = {
  name: 'string|min:3|max:30',
  stateId: 'integer',
  address: 'string|min:10',
  hallCapacity: 'numeric',
  carParkCapacity: 'numeric',
  facilities: 'array',
  price: 'numeric',
};

const signInRules = {
  email: 'required|email',
  password: 'required|min:6',
};

const resetRequestRules = {
  email: 'required|email'
};

const passwordResetRules = {
  password: 'required|min:6',
  confirmPassword: 'required|min:6',
};

const centerRules = {
  name: 'required|string|min:3|max:30',
  stateId: 'required|integer',
  address: 'required|string|min:10',
  hallCapacity: 'required|string',
  carParkCapacity: 'required|string',
  facilities: 'required',
  price: 'required|string',
  image: 'required'
};

const eventRules = {
  eventName: 'required|string|min:3|max:30',
  startDate: 'required|string',
  days: 'required|string',
  image: 'required'
};

const eventUpdateRules = {
  eventName: 'string|min:3|max:20',
  startDate: 'date',
  days: 'numeric',
  centerId: 'integer'
};

const sendResponse = (validation) => {
  if (!validation.passes()) {
    const { errors } = validation;
    const err = errors.errors;
    return err;
  }
  return null;
};

/**
 * A class to handle form validation across app
 */
export default class FormValidator {
  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateInput(data) {
    const validate = new validator(data, passwordResetRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validatePasswordReset(data) {
    const validate = new validator(data, resetRequestRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateSignUp(data) {
    const validate = new validator(data, signUpRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateSignIn(data) {
    const validate = new validator(data, signInRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateCenterForm(data) {
    const validate = new validator(data, centerRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateUpdateCenterForm(data) {
    const validate = new validator(data, centerUpdateRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateEventForm(data) {
    const validate = new validator(data, eventRules);
    const errors = sendResponse(validate);
    return errors;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateUpdateEventForm(data) {
    const validate = new validator(data, eventUpdateRules);
    const errors = sendResponse(validate);
    return errors;
  }
}
