import validator from 'validatorjs';
import Sequelize from 'sequelize';
import model from '../../models';
import Pagination from '../../services/pagingService';

const Centers = model.Center;
const Events = model.Event;
const States = model.State;


// validation rules for user input
const centerRules = {
  name: 'required|string|min:3|max:30',
  stateId: 'required|integer',
  address: 'required|string|min:10',
  hallCapacity: 'required|numeric',
  carParkCapacity: 'required|numeric',
  facilities: 'required|array',
  price: 'required|numeric',
  image: 'required|string'
};

const centerUpdateRules = {
  name: 'string|min:3|max:30',
  stateId: 'integer',
  address: 'string|min:10',
  hallCapacity: 'numeric',
  carParkCapacity: 'numeric',
  facilities: 'array',
  price: 'numeric',
};


// JSDOC @return variables
/**
 * @typedef {object} CenterInsertResponse
 *
 * @property {string} message - Response message
 *
 * @property {Number} centerId - Id of new center
 *
 * @property {Number} statusCode - HTTP status code of response
 */

/**
 * @typedef {object} CenterUpdateResponse
 *
 * @property {string} message - Response message
 *
 * @property {Number} statusCode - HTTP status code of response
 *
 */

/**
 * @export
 *
 * @class CenterController
 *
 */
export default class CenterController {
  // /**
  //  *
  //  * @param {string|array} facilitiesInput - A string or array of facilities
  //  *
  //  * @returns {array} An array of facilities in lowercase
  //  *
  //  * @memberof CenterController
  //  */
  // static handleFacilities(facilitiesInput) {
  //   return facilitiesInput.map(f => f.toLowerCase());
  //   // // If parameter is an array
  //   // if (Array.isArray(facilitiesInput)) {
  //   //   facilities = facilitiesInput.map(f => f.toLowerCase());
  //   // } else if (typeof facilitiesInput === 'string') {
  //   //   facilities = facilitiesInput.split(',')
  //   //     .map(facility => facility.trim().toLowerCase())
  //   //     .filter(word => word !== ' ');
  //   // } else {
  //   //   return 'invaild facilities input';
  //   // }
  //   // return facilities;
  // }

  /**
   * Check if Center already exists
   *
   * @memberOf {CenterController}
   *
   * @param {object} req - HTTP request Object
   *
   * @param {object} res - HTTP response Object
   *
   * @return {object|null} - JSON response if center exists or null if otherwise
   *
   * @memberof CenterController
   */
  static validateCenterName(req, res) {
    let query;
    if (req.params.centerId) {
      query = {
        name: req.body.name,
        stateId: req.body.stateId,
        address: req.body.address,
        id: {
          [Sequelize.Op.ne]: parseInt(req.params.centerId, 10)
        }
      };
    } else {
      query = {
        name: req.body.name,
        address: req.body.address,
        stateId: req.body.stateId
      };
    }
    return Centers.findAll({ where: query })
      .then((centers) => {
        if (centers.length > 0) {
          return res.status(409).json({ message: 'Center already exists', statusCode: 409 });
        }
        return null;
      });
  }


  /**
   * Insert new center into database
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {CenterInsertResponse} - JSON response
   *
   * @memberof CenterController
   */
  static handleCenterInsert(req, res) {
    req.body.facilities = req.body.facilities.map(f => f.toLowerCase());
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
      price: parseFloat(req.body.price)
    })
      .then(center => res.status(201).json({ message: 'New Center Created', centerId: center.id, statusCode: 201 }));
  }

  /**
   *
   * @param {object} center - existing center in database
   *
   * @param {object} request - HTTP request body
   *
   * @param {object} response - HTTP response object
   *
   * @returns {CenterUpdateResponse} - JSON response
   *
   * @memberof CenterController
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
      price: parseFloat(request.price) || center.price
    })
      .then(updatedCenter => response.status(200).json({
        message: 'Center update successful',
        statusCode: 200,
        updatedCenter
      }));
  }


  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {function}
   *
   * Create a new center.
   * Handles validations and sends validated data to database insert helper
   *
   * @memberof CenterController
   */
  static create(req, res) {
    if (req.decoded.isAdmin === true) {
      const centerValidation = new validator(req.body, centerRules);
      if (centerValidation.passes()) {
        return CenterController.validateCenterName(req, res)
          .then((report) => {
            if (!report) return CenterController.handleCenterInsert(req, res);
          });
      }
      return res.status(400).json({ message: centerValidation.errors, statusCode: 400 });
    }
    return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
  }

  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} The list of all centers
   *
   * @memberof CenterController
   */
  static getAll(req, res) {
    const url = {
      baseUrl: req.baseUrl,
      model: 'centers'
    };
    const limit = parseInt(req.query.limit, 10) || 1;
    let offset = 0;
    const currentPage = parseInt(req.query.page, 10) || 1;
    offset = limit * (currentPage - 1);
    return Centers.findAndCountAll({
      include: [{
        model: model.State,
        required: true,
        attributes: ['stateName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }],
      limit,
      offset
    })
      .then((centers) => {
        if (centers.rows < 1) {
          return res.status(404).json({
            message: 'No Centers Available',
            statusCode: 404,
            meta: null,
            data: null
          });
        }
        return res.status(200).json({
          message: 'Centers Retrieved',
          statusCode: 200,
          data: centers.rows,
          metaData: {
            pagination: Pagination.createPagingData(centers, limit, offset, currentPage, url),
          }
        });
      });
  }

  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} The requested center object
   *
   * @memberof CenterController
   */
  static get(req, res) {
    if (isNaN(req.params.centerId)) return res.status(400).json({ message: 'Invalid Center Id', statusCode: 400 });
    return Centers.findOne({
      where: {
        id: req.params.centerId
      },
      attributes: ['id', 'stateId', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy', 'image'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['stateName']
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
            message: 'Center Not Found',
            statusCode: 404 // return this when center is not present
          });
        }
        return res.status(200).send({ message: 'Center Retrieved', center, statusCode: 200 }); // return this if center is present
      });
  }

  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP request object
   *
   * @returns {json} Object with properties message and statusCode
   *
   * @memberof CenterController
   */
  static update(req, res) {
    if (isNaN(req.params.centerId)) return res.status(400).json({ message: 'Invalid CenterId', statusCode: 400 });
    if (req.decoded.isAdmin === true) {
      req.body.admin = req.decoded.id;
      const centerValidation = new validator(req.body, centerUpdateRules);
      if (centerValidation.passes()) {
        Centers.findOne({
          where: {
            id: req.params.centerId
          }
        })
          .then((center) => {
            if (!center) {
              return res.status(404).json({
                message: 'center does not exist',
                statusCode: 404
              });
            }
            if (req.body.facilities) {
              req.body.facilities = req.body.facilities.map(f => f.toLowerCase());
            }
            if (req.body.name && req.body.name !== center.name) {
              return CenterController.validateCenterName(req, res)
                .then((report) => {
                  if (!report) {
                    return CenterController.handleCenterUpdate(center, req.body, res);
                  }
                });
            }
            return CenterController.handleCenterUpdate(center, req.body, res);
          });
      } else {
        return res.status(400).json({ message: centerValidation.errors, statusCode: 400 });
      }
    } else {
      return res.status(401).json({ message: 'This user is not an administrator', statusCode: 401 });
    }
  }

  /**
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - JSON object if deletion is successful
   *
   * @memberof CenterController
   */
  static delete(req, res) {
    if (isNaN(req.params.centerId)) return res.status(400).json({ message: 'Invalid CenterId', statusCode: 400 });
    if (req.decoded.isAdmin === true) {
      return Centers.findById(req.params.centerId)
        .then((center) => {
          if (!center) {
            return res.status(404).json({
              message: 'Center does not exist',
            });
          }
          return center.destroy()
            .then(() => res.status(200).json({ message: 'Center is successfully deleted', statusCode: 200 }));
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', statusCode: 500 }));
    }
  }

  /**
   *
   * @param {object} params - User search combinations
   *
   * @returns {object} - sequelize query
   *
   * @memberOf CenterController
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
    const limit = params.limit || 9;
    return { query, limit };
  }

  /**
   *
   * @param {object} req - HTTP request Object
   *
   * @param {object} res - HTTP response Object
   *
   * @returns {object} returns centers result
   *
   * @memberof CenterController
   */
  static searchCenters(req, res) {
    const url = {
      baseUrl: req.baseUrl,
      model: 'searchCenters'
    };
    let offset = 0;
    const { query, limit } = CenterController.generateQuery(req.body);
    const { page } = req.body;
    offset = limit * (page - 1);
    if (query) {
      Centers.findAndCountAll({
        where: query,
        limit,
        offset,
        include: [{
          model: model.State,
          required: true,
          attributes: ['stateName']
        }, {
          model: model.User,
          required: true,
          attributes: ['username']
        }]
      })
        .then((centers) => {
          if (centers.row < 1) {
            return res.status(404).json({
              message: 'No centers found',
              statusCode: 404,
              data: null,
              meta: null,
            });
          }
          return res.status(200).json({
            message: 'Centers retrieved',
            data: centers.rows,
            metadata: {
              pagination: Pagination.createPagingData(centers, limit, offset, page, url),
            },
            statusCode: 200
          });
        });
    }
  }

  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - List of states
   *
   * @memberof CenterController
   *
   */
  static getAllStates(req, res) {
    return States.findAll({ limit: 37 })
      .then((states) => { res.status(200).json({ message: 'States Retrieved', states, statusCode: 200 }); });
  }
}
