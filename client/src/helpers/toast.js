import Toastify from 'toastify-js';

/**
 * A class for Materialize toast
 */
export default class Toast {
  /**
   *
   * @param {*} data
   * @returns {*} toast
   */
  static success(data) {
    Toastify({
      text: data,
      duration: 1000,
      close: true,
      gravity: 'buttom',
      positionLeft: false,
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)'
    }).showToast();
  }

  /**
   *
   * @param {*} data
   * @returns {*} toast
   */
  static error(data) {
    Toastify({
      text: data,
      duration: 1000,
      close: true,
      gravity: 'bottom',
      positionLeft: false,
      backgroundColor: 'linear-gradient(to right, #ffa29d, red)'
    }).showToast();
  }
}
