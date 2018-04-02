import validator from 'validatorjs';
import Sequelize from 'sequelize';
import model from '../models';

const Centers = model.Center;
const Events = model.Event;
const States = model.State;


// validation rules for user input
const centerRules = {
  name: 'required|string|min:3|max:30',
  stateId: 'required|integer',
  address: 'required|string|min:10',
  hallCapacity: 'required|string',
  carParkCapacity: 'required|string',
  facilities: 'required|string',
  price: 'required|string',
  image: 'required|string'
};

const centerUpdateRules = {
  name: 'string|min:3|max:30',
  stateId: 'integer',
  address: 'string|min:10',
  hallCapacity: 'string',
  carParkCapacity: 'string',
  facilities: 'string',
  price: 'string',
};


// JSDOC @return variables
/**
 * @typedef {object} CenterInsertResponse
 * @property {string} message - Response message
 * @property {Number} centerId - Id of new center
 * @property {Number} statusCode - HTTP status code of response
 */

/**
 * @typedef {object} CenterUpdateResponse
 * @property {string} message - Response message
 * @property {Number} statusCode - HTTP status code of response
 */

/**
 * @export
 * @class CenterController
 *
 *
 */
export default class CenterController {
  /**
   *
   * @param {string|array} facilitiesInput - A string or array of facilities
   * @returns {array} An array of facilities
   * @memberOf CenterController
   */
  static handleFacilities(facilitiesInput) {
    let facilities;
    // If parameter is an array
    if (Array.isArray(facilitiesInput)) {
      facilities = facilitiesInput.map(f => f.toLowerCase());
    } else if (typeof facilitiesInput === 'string') {
      facilities = facilitiesInput.split(',')
        .map(facility => facility.trim().toLowerCase())
        .filter(word => word !== ' ');
    } else {
      return 'invaild facilities input';
    }
    return facilities;
  }

  /**
   * Check if Center already exists
   *
   * @param {*} req - HTTP request Object
   * @param {*} res - HTTP response Object
   * @return {object|null} - JSON response if center exists or null if otherwise
   */
  static validateCenterName(req, res) {
    let query;
    if (req.params.centerId) {
      query = {
        name: req.body.name,
        stateId: req.body.stateId,
        address: req.body.address
      };
    } else {
      query = {
        name: req.body.name,
        address: req.body.address,
        stateId: req.body.stateId,
        id: {
          [Sequelize.Op.ne]: req.params.centerId
        }
      };
    }
    return Centers.findAll({
      where: query
    })
      .then((centers) => {
        // Check atleast a match is found
        if (centers.length > 0) {
          return res.status(400).json({ message: 'Center already exists', statusCode: 400 });
        }
        return null;
      });
  }

  /**
   * Insert new center into database
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {CenterInsertResponse} - JSON response
   */
  static handleCenterInsert(req, res) {
    req.body.facilities = CenterController.handleFacilities(req.body.facilities);
    Centers.create({
      name: req.body.name,
      stateId: parseInt(req.body.stateId, 10),
      address: req.body.address,
      hallCapacity: parseInt(req.body.hallCapacity, 10),
      carParkCapacity: parseInt(req.body.carParkCapacity, 10),
      facilities: req.body.facilities,
      image: req.body.image,
      createdBy: parseInt(req.decoded.id, 10),
      updatedBy: parseInt(req.decoded.id, 10),
      price: parseInt(req.body.price, 10)
    })
      .then(center => res.status(201).json({ message: 'New Center Created', centerId: center.id, statusCode: 201 }));
  }

  /**
   *
   * @param {object} center - existing center in database
   * @param {object} request - HTTP request body
   * @param {object} response - HTTP response object
   * @returns {CenterUpdateResponse} - JSON response
   */
  static handleCenterUpdate(center, request, response) {
    return center.update({
      name: request.name || center.name,
      stateId: parseInt(request.stateId, 10) || center.stateId,
      address: request.address || center.address,
      hallCapacity: parseInt(request.hallCapacity, 10) || center.hallCapacity,
      carParkCapacity: parseInt(request.carParkCapacity, 10) ||
      center.carParkCapacity,
      facilities: request.facilities || center.facilities,
      image: request.image || center.image,
      updatedBy: parseInt(request.admin, 10) || center.updatedBy,
      price: parseInt(request.price, 10) || center.price
    })
      .then(updatedCenter => response.status(200).json({
        message: 'Center update successful',
        statusCode: 200
      }));
  }

  /**
   * Create a new center
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {function} Object with properties message, statusCode, centerId( if request succeeds )
   */
  static create(req, res) {
    // Ensure user is an admin
    if (req.decoded.isAdmin === true) {
      const centerValidation = new validator(req.body, centerRules);
      // Validate request body fields meet validation rules
      if (centerValidation.passes()) {
        return CenterController.validateCenterName(req, res)
          .then((report) => {
            if (report === null) {
              return CenterController.handleCenterInsert(req, res);
            }
          });
      }
      // if validation fails
      return res.status(400).json({ message: centerValidation.errors, statusCode: 400 });
    }
    // If user isn't an administrator
    return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
  }

  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} The list of all centers
   */
  static getAll(req, res) {
    // to fetch all centers available in the database
    return Centers.findAll({
      attributes: ['id', 'stateId', 'name', 'image', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['statName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }]
    })
      .then((centers) => {
        if (centers.length < 1) {
          res.status(200).json({
            message: 'No Centers Available',
            statusCode: 200
          });
        }
        res.status(200).json({
          allCenters: centers
        }); // return all centers retrieved from the database
      });
  }

  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {json} The requested center object
   */
  static get(req, res) {
    // fecth single center with id provided in the request include dwith events in that center
    return Centers.findOne({
      where: {
        id: req.params.centerId
      },
      attributes: ['id', 'stateId', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy', 'image'],
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
        attributes: ['id', 'eventName', 'startDate', 'endDate', 'status']
      }]
    })
      .then((center) => {
        if (!center) {
          return res.status(404).json({
            message: 'Center Not Found', // return this when center is not present
          });
        }
        return res.status(200).send(center); // return this if center is present
      });
  }

  /**
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP request object
   * @returns {json} Object with properties message and statusCode
   */
  static update(req, res) {
    if (req.decoded.isAdmin === true) {
      req.body.admin = req.decoded.id;
      const centerValidation = new validator(req.body, centerUpdateRules);
      if (centerValidation.passes()) {
        // find the center
        Centers.findOne({
          where: {
            id: req.params.centerId
          }
        })
          .then((center) => {
            // if center doesn't exist
            if (!center) {
              return res.status(404).json({
                message: 'center does not exist',
                statusCode: 404
              });
            }
            if (req.body.facilities) {
              req.body.facilities = CenterController.handleFacilities(req.body.facilities);
            }
            // if center name is changed, check if new center name is available
            if (req.body.name && req.body.name !== center.name) {
              return CenterController.validateCenterName(req, res)
                .then((report) => {
                  if (report === null) {
                    return CenterController.handleCenterUpdate(center, req.body, res);
                  }
                });
            }
            return CenterController.handleCenterUpdate(center, req.body, res);
          })
          .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
      } else {
        // if validation fails
        return res.status(400).json({ message: centerValidation.errors, statusCode: 400 });
      }
    } else {
      // If user isn't an administrator
      return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} returns message object id deletion is successful
   */
  static delete(req, res) {
    // to check if user is an admin
    if (req.decoded.isAdmin === true) {
      return Centers.findById(req.params.centerId)
        .then((center) => {
          if (!center) {
            return res.status(404).json({
              message: 'Center does not exist',
            });
          }
          return center.destroy()
          // to return this center is deleted successfully
            .then(() => res.status(200).json({ message: 'Center is successfully deleted', statusCode: 200 }));
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
  }

  /**
   *
   * @param {object} params
   * @returns {object} query
   */
  static generateQuery(params) {
    const query = {};
    const { Op } = Sequelize;
    if (params.location) query.stateId = params.location;
    if (params.name) query.name = params.name;
    if (params.facilities) {
      query.facilities = {
        [Op.contains]: params.facilities
      };
    }
    if (params.capacity) {
      query.hallCapacity = {
        [Op.between]: [params.capacity[0], params.capacity[1]]
      };
    }
    return query;
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {*} returns centers result
   */
  static searchCenters(req, res) {
    const query = CenterController.generateQuery(req.body);
    if (query) {
      const limit = 9;
      let offset = 0;
      // count all centers that match query and use tota; ammount to determine
      // number of pages
      Centers.findAndCountAll({ where: query })
        .then((centers) => {
          const { page } = req.body;
          const pages = Math.ceil(centers.count / limit);
          offset = limit * (page - 1);
          Centers.findAll({
            where: query,
            attributes: ['id', 'name', 'address', 'image'],
            limit,
            offset,
            include: [{
              model: model.State,
              required: true,
              attributes: ['statName']
            }, {
              model: model.User,
              required: true,
              attributes: ['username']
            }]
          })
            .then((centersList) => {
              const response = {
                centers: centersList,
                pages,
                page
              };
              return res.status(200).json(response);
            });
        });
    }
  }

  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} - List of states
   *
   */
  static getAllStates(req, res) {
    return States.findAll({ limit: 37 })
      .then((states) => { res.status(200).json(states); });
  }
}
