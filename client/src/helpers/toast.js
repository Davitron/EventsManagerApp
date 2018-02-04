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
    return Materialize.toast(data, 5000, 'green');
  }

  /**
   *
   * @param {*} data
   * @returns {*} toast
   */
  static error(data) {
    return Materialize.toast(data, 5000, 'red');
  }
}
