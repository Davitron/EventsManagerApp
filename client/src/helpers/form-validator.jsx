import isEmpty from 'lodash/isEmpty';
import validator from 'validatorjs';
import Logger from './logger';

const signUpRules = {
  email: 'required|email',
  username: 'required|string|min:3|max:16',
  password: 'required|min:6',
  confirmPassword: 'required|min:6',
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
};

const eventRules = {
  eventName: 'required|string|min:3|max:30',
  startDate: 'required|string',
  days: 'required|string'
};

/**
 * A class to handle form validation across app
 */
export default class FormValidator {
  /**
   * @param {*} data
   *@returns {boolean} checkes validity status
   */
  checkStatus(data) {
    let status = true;
    for (const prop in data) {
      if (!isEmpty(data[prop])) {
        status = false;
        break;
      }
    }
    return status;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateInput(data) {
    const validate = new validator(data, passwordResetRules);
    if (!validate.passes()) {
      const { errors } = validate;
      const err = errors.errors;
      return err;
    }
    return null;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validatePasswordReset(data) {
    const validate = new validator(data, resetRequestRules);
    if (!validate.passes()) {
      const { errors } = validate;
      const err = errors.errors;
      return err;
    }
    return null;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateSignUp(data) {
    const validate = new validator(data, signUpRules);
    if (!validate.passes()) {
      const { errors } = validate;
      const err = errors.errors;
      Logger.log(JSON.stringify(err));
      return err;
    }
    return null;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateSignIn(data) {
    const validate = new validator(data, signInRules);
    if (!validate.passes()) {
      const { errors } = validate;
      const err = errors.errors;
      Logger.log(JSON.stringify(err));
      return err;
    }
    return null;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateCenterForm(data) {
    const validate = new validator(data, centerRules);
    if (!validate.passes()) {
      const { errors } = validate;
      const err = errors.errors;
      Logger.log(JSON.stringify(err));
      return err;
    }
    return null;
  }

  /**
   *
   * @param {*} data
   * @returns {null | object}
   * To check if given email is a valid format
   */
  validateEventForm(data) {
    const validate = new validator(data, eventRules);
    if (!validate.passes()) {
      const { errors } = validate;
      const err = errors.errors;
      Logger.log(JSON.stringify(err));
      return err;
    }
    return null;
  }
}
