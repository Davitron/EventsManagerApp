import Sequelize from 'sequelize';
import model from '../models';

const Centers = model.Center;
const Events = model.Event;

/**
 *
 */
export default class CenterService {
  /**
   *
   * @param {*} req
   * @returns {json} returns center object if successful and error object if otherwise
   */
  static create(req) {
    const facilityArr = req.body.facilities.split(',')
      .map(facility => facility.trim().toLowerCase())
      .filter(word => word !== ' ');
    return Centers.create({
      name: req.body.name,
      stateId: parseInt(req.body.stateId, 10),
      address: req.body.address,
      hallCapacity: parseInt(req.body.hallCapacity, 10),
      carParkCapacity: parseInt(req.body.carParkCapacity, 10),
      facilities: facilityArr,
      image: 'uhvhsiuvsivi',
      createdBy: parseInt(req.decoded.id, 10),
      updatedBy: parseInt(req.decoded.id, 10),
      price: parseInt(req.body.price, 10)
    });
  }

  /**
   * @returns {json} returns an array of center objects
   */
  static getAll() {
    return Centers.findAll({
      attributes: ['id', 'stateId', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['statName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }]
    });
  }

  /**
   *
   * @param {*} id
   * @returns {json} returns a single center object
   */
  static getOne(id) {
    return Centers.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['statName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }, {
        model: Events,
        as: 'events',
        attributes: ['id', 'eventName', 'startDate', 'endDate']
      }]
    });
  }

  /**
   *
   * @param {*} req
   * @returns {json} returns center object if successful and error object if otherwise
   */
  static checkNameAvalability(req) {
    return Centers.findOne({
      where: {
        name: req.body.name,
        stateId: req.body.stateId,
        address: req.body.address,
        id: {
          [Sequelize.Op.ne]: req.params.centerId
        }
      }
    });
  }

  /**
   *
   * @param {*} req
   * @param {*} center
   * @returns {json} returns center object if successful and error object if otherwise
   */
  static update(req, center) {
    let facilityArr;
    if (req.body.facilities) {
      facilityArr = req.body.facilities.split(',')
        .map(facility => facility.trim().toLowerCase())
        .filter(word => word !== ' ');
    }

    return center.update({
      name: req.body.name || center.name,
      stateId: parseInt(req.body.stateId, 10) || center.stateId,
      address: req.body.address || center.address,
      hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
      carParkCapacity: parseInt(req.body.carParkCapacity, 10) || center.carParkCapacity,
      facilities: facilityArr || center.facilities,
      image: 'uhvhsiuvsivi' || center.image,
      updatedBy: parseInt(req.decoded.id, 10) || center.updatedBy,
      price: parseInt(req.body.price, 10) || center.price
    });
  }
}
