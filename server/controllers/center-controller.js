import validator from 'validatorjs';
import Sequelize from 'sequelize';
import model from '../models';


const Centers = model.Center;

const centerRules = {
  name: 'required|string|min:3',
  stateId: 'required|integer',
  address: 'required|string|min:10',
  hallCapacity: 'required|string',
  carParkCapacity: 'required|string',
  facilities: 'required|string',
  price: 'required|string',
};

/**
 *
 */
export default class CenterController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns created center
   */
  static create(req, res) {
    const validate = new validator(req.body, centerRules);
    if (validate.passes()) {
      return Centers.findAll({
        where: {
          name: req.body.name
        }
      }).then((centers) => {
        if (centers.length > 0) {
          res.status(400).json({
            message: 'Center already exist '
          });
        }
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
        })
          .then(center => res.status(201).json({
            message: 'New Center Is Created Successully',
            [center]: center
          }))
          .catch(err => res.status(500).json({
            message: 'Oops!, an error has occured',
            error: err
          }));
      });
    }
    res.status(400).json({ message: validate.errors });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns a list of all centers
   */
  static getAll(req, res) {
    return Centers.findAll().then((centers) => {
      if (centers.length < 1) {
        res.status(200).json({
          message: 'No Centers Available'
        });
      }
      res.status(200).json(centers);
    }).catch(err => res.status(500).json({
      message: 'Oops!, an error has occured',
      error: err.name
    }));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns a single center by id
   */
  static get(req, res) {
    return Centers.findById(req.params.centerId).then((center) => {
      if (!center) {
        return res.status(404).json({
          message: 'Center Not Found',
        });
      }
      return res.status(200).send(center);
    })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns {json} returns the updated center object
   */
  static update(req, res) {
    const validate = new validator(req.body, centerRules);
    if (validate.passes()) {
      Centers.findOne({
        name: req.body.name
      }).then((center) => {
        if (center) {
          if (center.id !== req.params.id) {
            res.status(400).json({ message: 'center with name already exist' });
          }
        }
        const facilityArr = req.body.facilities.split(',')
          .map(facility => facility.trim().toLowerCase())
          .filter(word => word !== ' ');

        if (req.decoded.isAdmin === true) {
          center.update({
            name: req.body.name || center.name,
            stateId: parseInt(req.body.stateId, 10) || center.stateId,
            address: req.body.address || center.address,
            hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
            carParkCapacity: parseInt(req.body.carParkCapacity, 10) || center.carParkCapacity,
            facilities: facilityArr || center.facilities,
            image: center.image,
            updatedBy: parseInt(req.decoded.id, 10) || center.updatedBy,
            price: parseInt(req.body.price, 10) || center.price,
          }).then(modifiedCenter => res.status(200).json({ message: 'center was modified successfully', center: modifiedCenter }))
            .catch(error => res.status(400).json(error));
        }
        return res.status(401).json({ message: 'User is not an Admin' });
      }).catch(error => res.status(500).json({ message: error }));
    }
  }


  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns message object
   */
  static delete(req, res) {
    return Centers.findById(req.params.id)
      .then((center) => {
        if (!center) {
          return res.status(404).json({
            message: 'Center does not exist',
          });
        }
        center.destroy()
          .then(() => res.status(204).json())
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   *
   */
  // static getStates(req, res) {
  //   return States.findAll().then((states) => {
  //     res.status(200).json(states);
  //   }).catch(err => res.status(500).json({
  //     message: 'Oops!, an error has occured',
  //     error: err.name
  //   }));
  // }
}
