import validator from 'validatorjs';
import Sequelize from 'sequelize';
import model from '../models';

const Centers = model.Center;
const Events = model.Event;
const States = model.State;


// compliance rules for user input
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

/**
 * @export
 * @class
 *
 */
export default class CenterController {
  /**
   *
   * @param {string|array} facilitiesInput - A string or array of facilities
   * @returns {array} An array of facilities
   *
   */
  static handleFacilities(facilitiesInput) {
    let facilities;
    // If parameter is an array
    if (Array.isArray(facilitiesInput)) {
      facilities = facilitiesInput.map(f => f.toLowerCase());
    } else {
      facilities = facilitiesInput.split(',')
        .map(facility => facility.trim().toLowerCase())
        .filter(word => word !== ' ');
    }
    return facilities;
  }
  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} Object with properties message, statusCode, centerId( if request succeeds )
   */
  static create(req, res) {
    // Ensure user is an admin
    if (req.decoded.isAdmin === true) {
      const centerValidation = new validator(req.body, centerRules);
      // Validate request body fields meet validation rules
      if (centerValidation.passes()) {
        // Check if center already exists
        Centers.findAll({
          where: {
            name: req.body.name,
            stateId: req.body.stateId,
            address: req.body.address
          }
        })
          .then((centers) => {
            // Check atleast a match is found
            if (centers.length > 0) {
              return res.status(400).json({
                message: 'Center already exists',
                statusCode: 400
              });
            }

            const facilityArray = CenterController.handleFacilities(req.body.facilities);
            Centers.create({
              name: req.body.name,
              stateId: parseInt(req.body.stateId, 10),
              address: req.body.address,
              hallCapacity: parseInt(req.body.hallCapacity, 10),
              carParkCapacity: parseInt(req.body.carParkCapacity, 10),
              facilities: facilityArray,
              image: req.body.image,
              createdBy: parseInt(req.decoded.id, 10),
              updatedBy: parseInt(req.decoded.id, 10),
              price: parseInt(req.body.price, 10)
            })
              .then(center => res.status(201).json({
                message: 'New Center Created',
                centerId: center.id,
                statusCode: 201
              }))
              .catch(error => res.status(500).json({
                message: 'Internal Server Error',
                statusCode: 500,
                error
              }));
          })
          .catch(error => res.status(500).json({
            message: 'Internal Server Error',
            statusCode: 500,
            error
          }));
      } else {
        // if validation fails
        return res.status(400).json({
          message: centerValidation.errors,
          statusCode: 400,
        });
      }
    } else {
      // If user isn't an administrator
      return res.status(401).json({
        message: 'This user is not an administrator',
        statusCode: 401
      });
    }
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
      }).catch(err => res.status(500).json({
        message: 'Oops!, an error has occured', // return this if an error occurs
        error: err.name
      }));
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
      attributes: ['id', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy', 'image'],
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
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP request object
   * @returns {json} Object with properties message and statusCode
   */
  static update(req, res) {
    if (req.decoded.isAdmin === true) {
      let facilityArray;
      const centerValidation = new validator(req.body, centerUpdateRules);
      if (centerValidation.passes()) {
        // user route parameter to find center
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
              facilityArray = CenterController.handleFacilities(req.body.facilities);
            } else {
              facilityArray = null;
            }
            if (req.body.name && req.body.name !== center.name) {
              Centers.findOne({
                where: {
                  name: req.body.name,
                  address: req.body.address,
                  stateId: req.body.stateId,
                  id: {
                    [Sequelize.Op.ne]: req.params.centerId
                  }
                }
              })
                .then((exist) => {
                  if (exist) {
                    return res.status(400).json({
                      message: 'A center already exist in this name and location',
                      statusCode: 400
                    });
                  }
                  center.update({
                    name: req.body.name || center.name,
                    stateId: parseInt(req.body.stateId, 10) || center.stateId,
                    address: req.body.address || center.address,
                    hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
                    carParkCapacity: parseInt(req.body.carParkCapacity, 10) ||
                    center.carParkCapacity,
                    facilities: facilityArray || center.facilities,
                    image: req.body.image || center.image,
                    updatedBy: parseInt(req.body.admin, 10) || center.updatedBy,
                    price: parseInt(req.body.price, 10) || center.price
                  })
                    .then(updatedCenter => res.status(200).json({
                      message: 'Center update successful',
                      status: 200
                    }))
                    .catch(error => res.status(500).json({
                      message: 'Internal Server Error',
                      statusCode: 500
                    }));
                })
                .catch(error => res.status(500).json({
                  message: 'Internal Server Error',
                  statusCode: 500
                }));
            }
            center.update({
              name: req.body.name || center.name,
              stateId: parseInt(req.body.stateId, 10) || center.stateId,
              address: req.body.address || center.address,
              hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
              carParkCapacity: parseInt(req.body.carParkCapacity, 10) ||
              center.carParkCapacity,
              facilities: facilityArray || center.facilities,
              image: req.body.image || center.image,
              updatedBy: parseInt(req.body.admin, 10) || center.updatedBy,
              price: parseInt(req.body.price, 10) || center.price
            })
              .then(updatedCenter => res.status(200).json({
                message: 'Center update successful',
                status: 200
              }))
              .catch(error => res.status(500).json({
                message: 'Internal Server Error',
                statusCode: 500
              }));
          })
          .catch(error => res.status(500).json({
            message: 'Internal Server Error',
            statusCode: 500
          }));
      } else {
        // if validation fails
        return res.status(400).json({
          message: centerValidation.errors,
          statusCode: 400,
        });
      }
    } else {
      // If user isn't an administrator
      return res.status(401).json({
        message: 'This user is not an administrator',
        statusCode: 401
      });
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
          center.destroy()
          // to return this center is deleted successfully
            .then(() => res.status(200).json({ message: 'Center is successfully deleted' }))
            .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(500).json(error));
    }
  }

  /**
   *
   * @param {object} params
   * @returns {object} query
   */
  static generateQuery(params) {
    let query = {};
    const { Op } = Sequelize;
    if (params.location === null && params.capacity && params.facilities) {
      query = {
        hallCapacity: {
          [Op.between]: [params.capacity[0], params.capacity[1]]
        },
        facilities: {
          [Op.contains]: params.facilities
        }
      };
      return query;
    }
    if (params.location && params.capacity === null && params.facilities) {
      query = {
        stateId: params.location,
        facilities: {
          [Op.contains]: params.facilities
        }
      };
      return query;
    }
    if (params.location && params.capacity && params.facilities === null) {
      query = {
        hallCapacity: {
          [Op.between]: [params.capacity[0], params.capacity[1]]
        },
        stateId: params.location,
      };
      return query;
    }
    if (params.location === null && params.capacity === null && params.facilities) {
      query = {
        facilities: {
          [Op.contains]: params.facilities
        }
      };
      return query;
    }
    if (params.location === null && params.capacity && params.facilities === null) {
      query = {
        hallCapacity: {
          [Op.between]: [params.capacity[0], params.capacity[1]]
        }
      };
      return query;
    }
    if (params.location && params.capacity === null && params.facilities === null) {
      query = {
        stateId: params.location
      };
      return query;
    }
    query = {
      hallCapacity: {
        [Op.between]: [params.capacity[0], params.capacity[1]],
      },
      facilities: {
        [Op.contains]: params.facilities
      },
      stateId: params.location
    };
    return query;
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {*} returns centers result
   */
  static searchCenters(req, res) {
    const query = this.generateQuery(req.body);
    const limit = 9;
    let offset = 0;
    // count all centers that match query and use tota; ammount to determine
    // number of pages
    Centers.findAndCountAll({ where: query })
      .then((centers) => {
        if (centers.length > 0) {
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
            })
            .catch(error => res.status(500).json({
              message: 'Internal Server Error',
              statusCode: 500
            }));
        }
        return res.status(200).json({
          message: 'No centers found',
          statusCode: 200
        });
      })
      .catch(error => res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      }));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} returns all states
   */
  static getAllStates(req, res) {
    return States.findAll({ limit: 37 })
      .then((states) => {
        if (!states) {
          return res.status(404).json({
            massage: 'There are no centers'
          });
        }
        res.status(200).json(states);
      })
      .catch(error => res.status(500).json({
        message: 'Server Error',
        statusCode: 500
      }));
  }
}
