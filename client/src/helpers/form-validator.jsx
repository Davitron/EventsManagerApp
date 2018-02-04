import isEmpty from 'lodash/isEmpty';
import validator from 'validatorjs';
import Logger from './logger';

const signUpRules = {
  email: 'required|email',
  username: 'required|string|min:3|max:16',
  password: 'required|min:6',
  confirmPassword: 'required|min:6',
};

/**
 * A class to handle form validation across app
 */
export default class FormValidator {
  /**
   *
   */
  constructor() {
    this.centerError = {
      name: '',
      stateId: '',
      address: '',
      facilities: '',
      hallCapacity: '',
      carParkCapacity: '',
      price: '',
      image: ''
    };
    this.signUpError = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.signInError = {
      email: '',
      password: '',
    };
    this.forgotPasswordError = '';
    this.resetPasswordError = {
      password: '',
      confirmPassword: ''
    };
  }

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
  validateSignUp(data) {
    const validate = new validator(data, signUpRules);
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
   * @returns{*} returns an object of erroor and boolean
   */
  validateCenterInput(data) {
    const isnum = /^\d+$/;
    if (isEmpty(data.name)) {
      this.centerError.name = 'Center Name is required';
    } else if (data.name.length < 3 || data.name.length > 30) {
      this.centerError.name = 'Center name must be between 3 to 30 characters';
    }

    if (isEmpty(data.stateId)) {
      this.centerError.stateId = 'Center state is required';
    }

    if (isEmpty(data.address)) {
      this.centerError.address = 'Center Address is required';
    }

    if (isEmpty(data.facilities)) {
      this.centerError.facilities = 'Center facilities is required';
    }

    if (isEmpty(data.facilities)) {
      this.centerError.facilities = 'Center facilities is required';
    }

    if (isEmpty(data.hallCapacity)) {
      this.centerError.hallCapacity = 'Hall capacity is required';
    } else if (isnum.test(data.hallCapacity) === false) {
      this.centerError.hallCapacity = 'Hall capacity must be a number';
    }

    if (isEmpty(data.carParkCapacity)) {
      this.centerError.carParkCapacity = 'Car park capacity is required';
    } else if (isnum.test(data.carParkCapacity) === false) {
      this.centerError.hallCapacity = 'Car park capacity must be a number';
    }

    if (isEmpty(data.price)) {
      this.centerError.price = 'Center price capacity is required';
    } else if (isnum.test(data.price) === false) {
      this.centerError.price = 'Center price capacity must be a number';
    }

    if (data.image === null || data.image === undefined) {
      this.centerError.image = 'Center image is required';
    }

    return {
      errors: this.centerError,
      isValid: this.checkStatus(this.centerError)
    };
  }
}
