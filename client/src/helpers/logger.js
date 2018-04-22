/**
 * This is a logger class that is used for development
 */
export default class Logger {
  /**
   *
   * @param {*} data
   * @returns {*}
   * logs data to browser console
   */
  static log(data) {
    return console.log(data); // eslint-disable-line
  }
}
