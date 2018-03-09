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
    return Materialize.toast(data, 5000, 'green app-toast');
  }

  /**
   *
   * @param {*} data
   * @returns {*} toast
   */
  static error(data) {
    return Materialize.toast(data, 5000, 'red app-toast');
  }

  /**
   *
   * @param {*} data
   * @returns {*} toast
   */
  static info(data) {
    return Materialize.toast(data, 5000, 'orange app-toast');
  }

  /**
   *
   * @returns {*} toast
   */
  static remove() {
    return $('.app-toast').fadeOut();
  }
}
