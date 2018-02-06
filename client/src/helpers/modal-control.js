/**
 * this is a utility class for controlling modals
 */
export default class Modal {
  /**
   *
   * @param {*} id
   * @param {*} action
   * @return {*} controls modal
   */
  static action(id, action) {
    return $(id).modal(action);
  }
}
