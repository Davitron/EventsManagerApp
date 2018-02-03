/**
 * this is a utility class for dispatching actions
 */
export default class Dispatcher {
  /**
   *
   * @param {*} actionType
   * @param {*} data
   * @return {action} dispatches an action
   */
  action(actionType, data) {
    const action = {
      type: actionType,
      data
    };
    return action;
  }
}
